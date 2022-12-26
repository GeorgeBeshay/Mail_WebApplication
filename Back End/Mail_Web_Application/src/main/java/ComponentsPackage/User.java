package ComponentsPackage;

import java.util.*;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/*
 * User Class is the essential core class of the project.
 * This is the class which objects instantiated from will be stored to the DB
 */
@Document(collection = "Users")
public class User {
	// ------------------------ Class Fields ------------------------
	@Id
	private String emailAddress;
	private String emailPassword;
	private ArrayList<Folder> folders;
	// ------------------------ Class Constructors ------------------------
	public User(String emailAddress, String emailPassword) {
		/**
		 * Creating the id field to be the same as the email address, 
		 * so as to be used on fetching the user from the DB. 
		 */
		this.emailAddress = emailAddress;
		this.emailPassword = emailPassword;
		this.folders = new ArrayList<Folder>();
	}
	// ------------------------ Class Methods ------------------------	
	public String getEmailAddress() {
		return emailAddress;
	}
	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}
	public String getEmailPassword() {
		return emailPassword;
	}
	public void setEmailPassword(String emailPassword) {
		this.emailPassword = emailPassword;
	}
	public ArrayList<Folder> getFolders() {
		return folders;
	}
	public void setFolders(ArrayList<Folder> folders) {
		this.folders = folders;
	}
	
	
	

}
