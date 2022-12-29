package RequestsPackage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ApplicationMainPackage.ServerCore;
import ComponentsPackage.User;

import static java.nio.file.Paths.get;
import static org.springframework.http.HttpHeaders.CONTENT_DISPOSITION;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/callBackEndServer")
@RestController
public class RequestsController {
	
	@Autowired
	private ServerCore myServerCore = ServerCore.getServerCoreInstance();
	
	private static final String DIRECTORY = System.getProperty("user.dir") + "\\src\\main\\resources\\Attachements\\";;
	
	/**
	 * The sign In request method manages the front end requests of signing in,
	 * the method delegates the parameters to the # class which manages those parameters
	 * and return a boolean value indicating whether the email address and password given are valid or not
	 * @param emailPassword
	 */
	@PostMapping(value = {"/signIn/{emailAddress}"})
	public void signIn(@RequestBody String emailPassword, @PathVariable String emailAddress) {
		System.out.println("Front End Server Requested a Sign In Request" + 
				"\nBack End Server is Replying By: \n");
		System.out.println("------------------------------------------------");
	}
	
	/**
	 * The sign up request method manages the front end requests of signing up,
	 * and return a boolean value indicating whether the registration process was successful or 
	 * not (in case that the email address given was already taken.)
	 * @param emailPassword
	 */
	@PostMapping(value = {"/signUp/{emailAddress}"})
	public void signUp(@RequestBody String emailPassword, @PathVariable String emailAddress) {
		System.out.println("Front End Server Requested a Sign Up Request" + 
				"\nBack End Server is Replying By: \n");
		System.out.println("------------------------------------------------");
	}
	
	// ----------------- Testing ----------------- 
	
	@PostMapping(value = {"/testingDB/read"})
	public List<User> read(){
		return this.myServerCore.getAllUsers();
	}
	
	@PostMapping(value = {"/testingDB/read/{emailAddress}"})
	public User readById(@PathVariable String emailAddress){
		return this.myServerCore.getUserByEmail(emailAddress);
	}
	
	@PostMapping(value = {"/testingDB/write"})
	public User write(@RequestBody User user){
		return this.myServerCore.saveNewUser(user);
	}
	
	// -------------------------Uploading Attachements---------------------------------------------
	
	@PostMapping("/file/upload")
    public ResponseEntity<List<String>> uploadFiles(@RequestParam("files")List<MultipartFile> multipartFiles) throws IOException {
        List<String> filenames = new ArrayList<>();
        for(MultipartFile file : multipartFiles) {
        	File newFile = new File(DIRECTORY + file.getOriginalFilename());
        	file.transferTo(newFile);
            filenames.add(newFile.getName());
        }
        return ResponseEntity.ok().body(filenames);
    }

	// -------------------------Downlaoding Attachements-------------------------------------------
	
	@GetMapping("/file/download/{filename}")
    public ResponseEntity<Resource> downloadFiles(@PathVariable("filename") String filename) throws IOException {
        Path filePath = get(DIRECTORY).toAbsolutePath().normalize().resolve(filename);
        if(!Files.exists(filePath)) {
            throw new FileNotFoundException(filename + " was not found on the server");
        }
        Resource resource = new UrlResource(filePath.toUri());
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("File-Name", filename);
        httpHeaders.add(CONTENT_DISPOSITION, "attachment;File-Name=" + resource.getFilename());
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(Files.probeContentType(filePath)))
                .headers(httpHeaders).body(resource);
    }

}
