package RequestsPackage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ApplicationMainPackage.ServerCore;
import ComponentsPackage.SignInData;
import ComponentsPackage.User;

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
	@PostMapping(value = {"/updateUser"})
	public void updateUser(@RequestBody User modifiedUser) {
		System.out.println();
		System.out.println("------------------------------------------------");
		System.out.println("Front End Server Requested an update for the user data." + 
				"\nBack End Server is Replying By: \n");
		this.myServerCore.updateUser(modifiedUser);
	}

}