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
import ComponentsPackage.*;
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
public class Contacts_RC {
	
	@Autowired
	private ServerCore myServerCore = ServerCore.getServerCoreInstance();
	
	@PostMapping(value = {"/addnewContact/"})
	public User newCont( @RequestBody User currentUser) {
		System.out.println();
		System.out.println("------------------------------------------------");
		System.out.println("Front End Server Requested to create a new contact." + 
				"\nBack End Server is Replying By: \n");
		//return this.myServerCore.addContact(newContact, currentUser);
		return myServerCore.updateUser(currentUser);
	}
	
	@PostMapping(value = {"/deleteContact/{i}"})
	public User deleteCont( @PathVariable int i,@RequestBody User currentUser) {
		System.out.println();
		System.out.println("------------------------------------------------");
		System.out.println("Front End Server Requested to delete a contact." + 
				"\nBack End Server is Replying By: \n");
		//return this.myServerCore.addContact(newContact, currentUser);
		return myServerCore.deleContact(i,currentUser);
	}
	
	@PostMapping(value = {"/sort/{dateFlag}/{folderIndex}"})
	public User sort( @PathVariable boolean dateFlag, @PathVariable int folderIndex, @RequestBody User currentUser) {
		System.out.println();
		System.out.println("------------------------------------------------");
		System.out.println("Front End Server Requested to create a new contact." + 
				"\nBack End Server is Replying By: \n");
		//return this.myServerCore.addContact(newContact, currentUser);
		return myServerCore.sort(currentUser,folderIndex,dateFlag);
	}
	
	@PostMapping(value = {"/sortConts/"})
	public User sortConts( @RequestBody User myUser) {
		System.out.println();
		System.out.println("------------------------------------------------");
		System.out.println("Front End Server Requested to sort contacts." + 
				"\nBack End Server is Replying By: \n");
		//return this.myServerCore.addContact(newContact, currentUser);
		return myServerCore.sortConts(myUser);
	}
//	@PostMapping(value = {"/searchConts/{key}"})
//	public User searchConts(@PathVariable String key, @RequestBody User myUser) {
//		System.out.println();
//		System.out.println("------------------------------------------------");
//		System.out.println("Front End Server Requested to search contacts." + 
//				"\nBack End Server is Replying By: \n");
//		//return this.myServerCore.addContact(newContact, currentUser);
//		return myServerCore.searchConts(key, myUser);
//	}
	@PostMapping(value = {"/searchConts/{key}"})
	public ArrayList<Contact> searchConts(@PathVariable String key, @RequestBody User myUser) {
		System.out.println();
		System.out.println("------------------------------------------------");
		System.out.println("Front End Server Requested to search contacts." + 
				"\nBack End Server is Replying By: \n");
		//return this.myServerCore.addContact(newContact, currentUser);
		return myServerCore.searchConts(key, myUser);
	}

}
