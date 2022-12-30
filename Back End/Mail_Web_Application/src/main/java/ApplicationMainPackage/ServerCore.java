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
	// ---------------------------- Class Methods ----------------------------
	public List<User> getAllUsers(){
		return userRepo.findAll();
	}
	public User saveNewUser(User user) {
		return userRepo.save(user);
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
			return null;
		}
	}
}
