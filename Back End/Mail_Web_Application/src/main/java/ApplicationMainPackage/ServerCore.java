package ApplicationMainPackage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import ComponentsPackage.*;
import java.util.*;

@Service
/*
 * Class considered to be the functionality core of the application, 
 * all the requests received by the requests controller class will be delegated to
 * a parallel function here to do a certain task.
 */
public class ServerCore {
	// ---------------------------- Class Fields ----------------------------
	/*
	 * Singleton design pattern is applied here, as we want a single class managing
	 * all the front end requests and manipulating the data base.
	 */
	private static ServerCore serverCore;
	@Autowired
	UserRepository userRepo;
	// ---------------------------- Class Constructors ----------------------------
	private ServerCore() {
	}
	public static ServerCore getServerCoreInstance() {
		if(ServerCore.serverCore == null) 
			serverCore = new ServerCore();
		return ServerCore.serverCore;
	}
	// -------------------------------------------------------------------------------
	
	/**
	 * Method implements the sign up process, by taking the user data (User object), 
	 * and put the filled data into the class fields, then save it the the mongoDB
	 * @param user
	 * @return
	 */
	public User signUp(User user) {
		try {
			userRepo.findById(user.getEmailAddress()).get();
			System.out.println("User Email Address is already taken.");
			return null;
		} catch(Exception e) {
			System.out.println("User Has Been registered successfully.");
			return userRepo.save(user);
		}
	}
	
	/**
	 * Method used to check the user email address and password, if they match the
	 * given email address and password, the login is considered to be authenticated
	 * else, user log in is not enabled.
	 * @param signInData: the sign in data form, containing the email address and password.
	 * @return In case of being authenticated, User is returned else, null is returned.
	 */
	public User authenticate(SignInData signInData) {
		if(signInData.getEmailAddress().equals("") || signInData.getEmailPassword().equals("")) {
			System.out.println("No data entererd");
			return null;
		}
		String emailAddress = signInData.getEmailAddress();
		String emailPassword = signInData.getEmailPassword();
		try {
			User tempUser =  userRepo.findById(emailAddress).get();
			if(tempUser.getEmailPassword().compareTo(emailPassword) == 0) {
				System.out.println("Password has been authenticated.");
				return tempUser;
			} else {
				System.out.println("Password is incorrect.");
				return null;
			}
		} catch(Exception e) {
			System.out.println("Email Address Doesn't exist");
			e.printStackTrace();
			return null;
		}
	}
	
	/**
	 * Method updates / overwrite the current saved document by the new updated document.
	 * @param modifiedUser
	 */
	public User updateUser(User modifiedUser) {
		System.out.println("MongoDB has updated the user document.");
		return userRepo.save(modifiedUser);
	}
	
	/**
	 * Method receives an email template data, then push the mail to the receiver inbox folder, 
	 * and place the mail inside the sent folder of the sender user.
	 * @param emailReqData
	 * @return
	 */
	public User sendAnEmail(SendingEmail_Template emailReqData) {
		try {
		User receiverUser =  userRepo.findById(emailReqData.getEmail().getReceiver()).get();
		receiverUser.getFolders().get(0).addEmail(emailReqData.getEmail());
		System.out.println("Mail had been pushed to the inbox folder of the receiver account successfully.");
		this.updateUser(receiverUser); 
		} catch (Exception E) {
			System.out.println("User Error: Mail Receiver Account does not exist.");
		}
		System.out.println("Mail had been pushed to the sent folder of the sender account successfully.");
		emailReqData.getActiveUser().getFolders().get(1).addEmail(emailReqData.getEmail());
		return this.updateUser(emailReqData.getActiveUser());
	}
	
	/**
	 * Method Performs the deletion process of an email, taking the folder index and the email index
	 * as a method arguments, also the user concrete object, all wrapped inside the protocol defined.
	 * @param deleteEmailReqData
	 * @return
	 */
	public User deleteAnEmail(DeletingEmail_Protocol deleteEmailReqData) {
		try {
			Email tempMail = deleteEmailReqData.getActiveUser().getFolders().get(deleteEmailReqData.getActiveFolderIndex()).getEmails().remove(deleteEmailReqData.getActiveEmailIndex());
			if(deleteEmailReqData.getActiveFolderIndex() != 2) {
				deleteEmailReqData.getActiveUser().getFolders().get(2).addEmail(tempMail);
				System.out.println("Mail Has Been Deleted Successfully\n Moved to the trash folder");
			} else 
				System.out.println("Mail Has Been Deleted Permanently");
			return this.updateUser(deleteEmailReqData.getActiveUser());
		} catch(Exception E) {
			System.out.println("An Error Had Occured While Deleting An Email - Process.");
			return deleteEmailReqData.getActiveUser();
		}
	}
	
	/**
	 * Method performs adding a new custom folder to the folders list of a user.
	 * @param modifiedUser
	 * @param newFolderName
	 * @return
	 */
	public User addFolder(User modifiedUser, String newFolderName) {
		modifiedUser.getFolders().add(new Folder(newFolderName));
		return this.updateUser(modifiedUser);
	}
	
	public User addContact(Contact newContact, User user) {
		user.getContacts().add(newContact);
		return this.updateUser(user);
	}
	
	public User deleContact(int i, User user) {
		user.getContacts().remove(i);
		return this.updateUser(user);
	}
	
	
}
