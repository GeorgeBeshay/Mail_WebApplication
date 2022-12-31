package ApplicationMainPackage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
		return userRepo.save(modifiedUser);
	}
	
	
	public User addFolder(User modifiedUser, String newFolderName) {
		modifiedUser.getFolders().add(new Folder(newFolderName));
		return this.updateUser(modifiedUser);
	}
}
