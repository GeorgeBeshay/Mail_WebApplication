package RequestsPackage;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ApplicationMainPackage.ServerCore;
import ComponentsPackage.*;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/callBackEndServer")
@RestController
public class UpdateUserData_RC {
	
	@Autowired
	private ServerCore myServerCore = ServerCore.getServerCoreInstance();
	
	/**
	 * Request handles the updates / changes created on a user object.
	 * @param modifiedUser
	 */
	@PostMapping(value = {"/updateUser/"})
	public User updateUserData(@RequestBody User modifiedUser) {
		System.out.println();
		System.out.println("------------------------------------------------");
		System.out.println("Front End Server Requested an update for the user data." + 
				"\nBack End Server is Replying By:");
		return this.myServerCore.updateUser(modifiedUser);
	}
	
	@PostMapping(value = {"/createNewFolder/{folderName}"})
	public User addFolder(@PathVariable String folderName, @RequestBody User user) {
		System.out.println();
		System.out.println("------------------------------------------------");
		System.out.println("Front End Server Requested to create a new Folder." + 
				"\nBack End Server is Replying By:");
		return this.myServerCore.addFolder(user, folderName);
	}
	
	@PostMapping(value = {"/sendEmail/"})
	public User sendAnEmail(@RequestBody SendingEmail_Template  emailReqData) {
		System.out.println();
		System.out.println("------------------------------------------------");
		System.out.println("Front End Server Requested to send a mail." + 
				"\nBack End Server is Replying By:");
		return this.myServerCore.sendAnEmail(emailReqData);
	}
	
	@PostMapping(value = {"/deleteEmail/"})
	public User deleteAnEmail(@RequestBody DeletingEmail_Protocol deleteEmailReqData) {
		System.out.println();
		System.out.println("------------------------------------------------");
		System.out.println("Front End Server Requested to delete a mail." + 
				"\nBack End Server is Replying By:");
		return this.myServerCore.deleteAnEmail(deleteEmailReqData);
	}
	
	@PostMapping(value = {"/moveEmail/{fromFolderIndex}/{toFolderIndex}/{emailIndex}/"})
	public User moveAnEmail(@RequestBody User currentUser, @PathVariable int fromFolderIndex, @PathVariable int toFolderIndex, @PathVariable int emailIndex) {
		System.out.println();
		System.out.println("------------------------------------------------");
		System.out.println("Front End Server Requested to move a mail." + 
				"\nBack End Server is Replying By:");
		return this.myServerCore.moveAnEmail(currentUser, fromFolderIndex, toFolderIndex, emailIndex);
	}
	
	@PostMapping(value = {"/deleteFolder/"})
	public User deleteFolder(@RequestBody DeletingEmail_Protocol deleteFolderReqData) {
		System.out.println();
		System.out.println("------------------------------------------------");
		System.out.println("Front End Server Requested to delete a folder." + 
				"\nBack End Server is Replying By:");
		return this.myServerCore.deleteFolder(deleteFolderReqData);
		// Notice that the "DeletingEmail_Protocol" class is used although we won't use the third parameter
		// we've done this instead of creating another protocol
	}
	
	@PostMapping(value = {"/sortEmails/{folderIndex}/{flag}"})
	public User sortEmailsInFolder(@PathVariable int folderIndex,@PathVariable boolean flag, @RequestBody User user) {
		System.out.println();
		System.out.println("------------------------------------------------");
		System.out.println("Front End Server Requested to sort a Folder." + 
				"\nBack End Server is Replying By:");
		return this.myServerCore.sort(user, folderIndex,flag);
	}
	
	@PostMapping(value = {"/searchEmails/{folderIndex}/{searchBasedOn}/{searchAbout}/"})
	public ArrayList<Email> searchEmails(@RequestBody User currentUser, @PathVariable int folderIndex, @PathVariable int searchBasedOn, @PathVariable String searchAbout) {
		System.out.println("------------------------------------------------");
		System.out.println("Front End Server Requested to filter Emails." + 
				"\nBack End Server is Replying By:");
		return this.myServerCore.searchEmails(currentUser, folderIndex, searchBasedOn, searchAbout);
	}

}
