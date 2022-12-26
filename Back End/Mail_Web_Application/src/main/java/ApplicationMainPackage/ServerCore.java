package ApplicationMainPackage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ComponentsPackage.User;
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
	public User getUserByEmail(String emailAddress) {
		return userRepo.findById(emailAddress).get();
	}
}
