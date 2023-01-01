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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ApplicationMainPackage.ServerCore;

import static java.nio.file.Paths.get;
import static org.springframework.http.HttpHeaders.CONTENT_DISPOSITION;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

import FileHandlingRequests.FileServer;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/callBackEndServer")
@RestController
public class Files_RC {
	
	@Autowired(required = false)
	private FileServer fileServer = FileServer.getInstanceFileServer();
	
	private static final String DIRECTORY = System.getProperty("user.dir") + "\\src\\main\\resources\\Attachements\\";;
	
	// -------------------------Uploading Attachements---------------------------------------------
	
	@PostMapping("/file/upload")
    public ResponseEntity<List<String>> uploadFiles(@RequestParam("files")List<MultipartFile> multipartFiles) throws IOException {
        List<String> filenames = new ArrayList<>();
        for(MultipartFile file : multipartFiles) {
        	File newFile = new File(DIRECTORY + fileServer.getPath(file.getOriginalFilename()) + file.getOriginalFilename());
        	file.transferTo(newFile);
            filenames.add(newFile.getName());
        }
        return ResponseEntity.ok().body(filenames);
    }

	// -------------------------Downlaoding Attachements-------------------------------------------
	
	@GetMapping("/file/download/{filename}")
    public ResponseEntity<Resource> downloadFiles(@PathVariable("filename") String filename) throws IOException {
        Path filePath = get(DIRECTORY).toAbsolutePath().normalize().resolve(fileServer.getPath(filename) + filename);
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
