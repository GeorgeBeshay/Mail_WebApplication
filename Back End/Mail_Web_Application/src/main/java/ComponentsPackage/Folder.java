package ComponentsPackage;

import java.util.*;

public class Folder {
	// ------------------------ Class Fields ------------------------
	private String name;
	private ArrayList<Email> emails;
	// ------------------------ Class Constructors ------------------------
	public Folder(String name) {
		this.name = name;
		this.emails = new ArrayList<Email>();
	}
	// ------------------------ Class Methods ------------------------
	/**
	 * Adding new email to the current folder
	 * @param email
	 */
	public void addEmail(Email email) {
		this.emails.add(email);
	}
	/**
	 * Searching for a specific email by its subject
	 * if there is no email with this subject, return null and show an alert
	 * to the user.
	 * @param emailSubject
	 * @return if found, return email else return null.
	 */
	public Email getEmail(String emailSubject) {
		Email tempEmail = null;
		for(int i = 0 ; i < this.emails.size() ; i++) {
			if(this.emails.get(i).getSubject().equalsIgnoreCase(emailSubject)) {
				tempEmail = this.emails.get(i);
				break;
			}
		}
		if(tempEmail == null) {
			System.out.println("WARNING: Email Subject does not exist.");
		}
		return tempEmail;
	}
	/*
	 * Getters & Setters
	 */
	public ArrayList<Email> getEmails() {
		return emails;
	}
	public void setEmails(ArrayList<Email> emails) {
		this.emails = emails;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}
