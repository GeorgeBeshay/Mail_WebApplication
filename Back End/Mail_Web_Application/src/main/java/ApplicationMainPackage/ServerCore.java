package ApplicationMainPackage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ComponentsPackage.*;
import UserDataModifier.ContactsController;
import UserDataModifier.EmailController;
import UserDataModifier.FolderController;
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
	private HashMap<String , User> signedOutUsers;
	@Autowired
	UserRepository userRepo;
	// ---------------------------- Class Constructors ----------------------------
	private ServerCore() {
		this.signedOutUsers = new HashMap<String , User>();
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
		User tempUser = null;
		if(this.signedOutUsers.get(emailAddress) != null) {
			tempUser = this.signedOutUsers.get(emailAddress);
		}
		try {
			if(tempUser == null)
				tempUser =  userRepo.findById(emailAddress).get();
			if(tempUser.getEmailPassword().compareTo(emailPassword) == 0) {
				System.out.println("Password has been authenticated.");
				FolderController.checkValidityTrashFolder(tempUser.getFolders().get(2));
				return this.updateUser(tempUser);
			} else {
				System.out.println("Password is incorrect.");
				return null;
			}
		} catch(Exception e) {
			System.out.println("Email Address Doesn't exist");
//			e.printStackTrace();
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
		String[] Receivers = emailReqData.getEmail().getReceiver().split(", ");
		for(int i = 0 ; i < Receivers.length ; i++) {
			System.out.println(Receivers[i]);
		}
		for(int i = 0 ; i < Receivers.length ; i++) {
			emailReqData.getEmail().setReceiver(Receivers[i]);
			try {
			User receiverUser =  userRepo.findById(emailReqData.getEmail().getReceiver()).get();
			receiverUser.getFolders().get(0).addEmail(emailReqData.getEmail());
			System.out.println("Mail had been pushed to the inbox folder of the receiver account successfully.");
			this.updateUser(receiverUser); 
			} catch (Exception E) {
				System.out.println("User Error: Mail Receiver Account does not exist.");
			}
			System.out.println("Mail had been pushed to the sent folder of the sender account successfully.");
			emailReqData.getActiveUser().getFolders().get(1).addEmail(emailReqData.getEmail().clone());
		}
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
	
	/**
	 * Method performs the deletion process of a previously created folder.
	 * @param modifiedUser
	 * @param folderIndex
	 * @return
	 */
	public User deleteFolder(DeletingEmail_Protocol deleteFolderReqData) {
		if(deleteFolderReqData.getActiveFolderIndex() > 4) {
			deleteFolderReqData.getActiveUser().getFolders().remove(deleteFolderReqData.getActiveFolderIndex());
			System.out.println("Folder Has Been Deleted.");
		} else {
			System.out.println("Default Folders can't be deleted.");
		}
		return this.updateUser(deleteFolderReqData.getActiveUser());
	}
	
	public User addContact(Contact newContact, User user) {
		user.getContacts().add(newContact);
		return this.updateUser(user);
	}
	
	public User deleContact(int i, User user) {
		user.getContacts().remove(i);
		return this.updateUser(user);
	}
	
	public User sort(User user, int folderIndex, boolean dateFlag) {
		FolderController.sortPriority(user.getFolders().get(folderIndex), dateFlag);
		return this.updateUser(user);
	}
	
	public User moveAnEmail(User user, int fromFolderIndex, int toFolderIndex, int emailIndex) {
		FolderController.moveEmail(user.getFolders(), fromFolderIndex, toFolderIndex, emailIndex);
		return this.updateUser(user);
	}
	
	public User signOut(User user) {
		this.signedOutUsers.put(user.getEmailAddress(), user);
		System.out.println("Signed out successfully, user inserted to the temp cache.");
		return this.updateUser(user);
	}
	
	public User sortConts(User user) {
		ContactsController.sort(user.getContacts());
		return this.updateUser(user);
	}
//	public User searchConts(String key, User user) {
//		User temp=new User("0","0","0");
//		temp.setContacts(ContactsController.search(user.getContacts(),key));
//		return temp;	
//		
//	}
	public ArrayList<Contact> searchConts(String key, User user) {
		return ContactsController.search(user.getContacts(),key);	
	}
	
	public ArrayList<Email> searchEmails( User currentUser, int folderIndex, int searchBasedOn, String searchAbout){
		/*
		 * subject -> 0
		 * sender -> 1
		 * receiver -> 2
		 */
		ArrayList<Email> tempList = null;
		if(searchBasedOn == 0) {
			tempList = EmailController.getEmailsWithSubject(currentUser.getFolders().get(folderIndex), searchAbout);
		} else if(searchBasedOn == 1) {
			tempList = EmailController.getEmailsSentFrom(currentUser.getFolders().get(folderIndex), searchAbout);
		} else if(searchBasedOn == 2) {
			tempList = EmailController.getEmailsSentTo(currentUser.getFolders().get(folderIndex), searchAbout);
		} else if(searchBasedOn == 3) {
			tempList = EmailController.getEmailsWithBody(currentUser.getFolders().get(folderIndex), searchAbout);
		}
		if(tempList != null) {
			System.out.println("Emails have been filtered successfully.");
			System.out.println("Found Emails: \n" + tempList.toString());
			return tempList;
		} else {
			System.out.println("An Error Had Occured in search Emails Method.");
			return null;
		}
	}
	
	public User fetchUser(User user) {
		User tempUser = null;
		try {
			tempUser = userRepo.findById(user.getEmailAddress()).get();
			System.out.println("User has been fetched successfully from the MongoDB");
		} catch(Exception E) {
			tempUser = null;
			System.out.println("An Error Had Occured While fetching.");
		}
		if(tempUser == null)
			tempUser = user;
		return tempUser;
	}
	
	
	public void emptyTheDB() {
		userRepo.deleteAll();
		System.out.println("MongoDB Documents have been deleted.");
	}
	
	public User renameFolder(User currentUser, int fodlerIndex, String newName) {
		FolderController.renameFolder(currentUser.getFolders(), fodlerIndex, newName);
		System.out.println("Folder name has been changed successfully.");
		return this.updateUser(currentUser);
	}
	
}
