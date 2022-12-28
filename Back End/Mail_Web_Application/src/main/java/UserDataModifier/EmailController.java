package UserDataModifier;

import ComponentsPackage.*;
import java.util.*;

public class EmailController {
	
	/**
	 * The following method is designed to filter out the mails in a folder 
	 * that were sent from a specific contact
	 * The method implements the partitioning Filter DP.
	 * @param folder: folder in which the mails would be filtered.
	 * @param sender: string containing the sender email address.
	 * @return List of the mails with the required sender. 
	 */
	public static ArrayList<Email> getEmailsSentFrom(Folder folder, String sender){
		EmailCriteria senderCriteria = new SenderCriteria();
		return senderCriteria.meetCriteria(folder, sender);
	}
	
	/**
	 * The following method is designed to filter out the mails in a folder 
	 * with a certain subject
	 * The method implements the partitioning Filter DP.
	 * @param folder: folder in which the mails would be filtered.
	 * @param subject: email subject upon which the mails would be filtered out.
	 * @return List of the mails with the required subject. 
	 */
	public static ArrayList<Email> getEmailsWithSubject(Folder folder, String subject){
		EmailCriteria subjectCriteria = new SubjectCriteria();
		return subjectCriteria.meetCriteria(folder, subject);
	}
	
	/**
	 * Method designed to filter out the mails sent to a specific user.
	 * @param folder: folder filtering the mails from.
	 * @param receiver: email receiver name.
	 * @return List of mails sent to the required user.
	 */
	public static ArrayList<Email> getEmailsSentTo(Folder folder, String receiver){
		EmailCriteria receiverCriteria = new ReceiverCriteria();
		return receiverCriteria.meetCriteria(folder, receiver);
	}
	
	/**
	 * The following method is designed to search for a specific email among ALL THE USER FOLDERS
	 * by the email subject.
	 * Method complexity is O(n^2)
	 * @param folders: The list containing all the user folders.
	 * @param emailSubj
	 * @return
	 */
	public static Email searchForEmail(ArrayList<Folder> folders, String emailSubj) {
		Email tempEmail;
		Folder currentFolder;
		ArrayList<Email> folderEmails;
		// --------------------- Separator ---------------------
		for(int i = 0 ; i < folders.size() ; i++) {
			currentFolder = folders.get(i);
			folderEmails = currentFolder.getEmails();
			// --------------------- Separator ---------------------
			for(int j = 0 ; j < folderEmails.size() ; j++) {
				tempEmail = folderEmails.get(j);
				if(tempEmail.getSubject().equalsIgnoreCase(emailSubj)) 
					return tempEmail;
			}
			// --------------------- Separator ---------------------
		}
		// --------------------- Separator ---------------------
		System.out.println("User Error: The email you are looking for is not found.");
		System.out.println("Package UserDataModifier >> Class EmailController >> Method searchForEmail.");
		System.out.println();
		return null;
	}
	

}
