package ComponentsPackage;

import java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date; 
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/*
 * User Class is the essential core class of the project.
 * This is the class which objects instantiated from will be stored to the DB
 */
@Document(collection = "Users")
public class User {
	// ------------------------ Class Fields ------------------------
//	@Id
	private String _id;
	private String emailAddress;
	private String emailPassword;
	private String fullName;
	private String bd;
	private ArrayList<Folder> folders;
	private ArrayList<Contact> contacts;
	// ------------------------ Class Constructors ------------------------
	public User(String emailAddress, String emailPassword, String bd) {
		/**
		 * Creating the id field to be the same as the email address, 
		 * so as to be used on fetching the user from the DB. 
		 */
		this._id = emailAddress;
		this.emailAddress = emailAddress;
		this.emailPassword = emailPassword;
		this.bd = bd;
		this.folders = new ArrayList<Folder>();
		this.contacts = new ArrayList<Contact>();
		this.folders.add(new Folder("Inbox"));
		this.folders.add(new Folder("Sent"));
		this.folders.add(new Folder("Trash"));		
		this.folders.add(new Folder("Starred"));
		this.folders.add(new Folder("Draft"));
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
	public String get_id() {
		return _id;
	}
	public void set_id(String _id) {
		this._id = _id;
	}
	public ArrayList<Contact> getContacts() {
		return contacts;
	}
	public void setContacts(ArrayList<Contact> contacts) {
		this.contacts = contacts;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getBd() {
		return bd;
	}
	public void setBd(String bd) {
		this.bd = bd;
	}
	
	

}
