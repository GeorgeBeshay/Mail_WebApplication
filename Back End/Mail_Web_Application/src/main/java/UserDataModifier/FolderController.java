package UserDataModifier;

import ComponentsPackage.*;
import java.util.*;

public class FolderController {
	
	public static void deleteEmailWithSubject(Folder folder, String subject) {
		folder.getEmails().remove(folder.getEmail(subject));
	}
	
	public static void deleteEmailsWithCommonAttribute(Folder folder, ArrayList<Email> emails) {
		for(Email tempEmail: emails) 
			folder.getEmails().remove(tempEmail);
	}

	public static void moveEmail(ArrayList<Folder> folders, int fromFolderIndex, int toFolderIndex, int emailIndex) {
		try {
			Email tempEmail = folders.get(fromFolderIndex).getEmails().remove(emailIndex);
			folders.get(toFolderIndex).addEmail(tempEmail);
			System.out.println("Moving Process Completed.");
			System.out.println("Email With Subject: " + tempEmail.getSubject() + 
					"\n Has been moved from folder: " + folders.get(fromFolderIndex).getName() + 
					"\nTo folder: " + folders.get(toFolderIndex).getName());
		} catch (Exception E) {
			System.out.println("An Error had occured while moving the email from a folder to another");
		}
	}
	
	public static void sortPriority(Folder folder , boolean dateFlag) {
		ArrayList <Email> myEmails = folder.getEmails();
		
		if(dateFlag) { // sort by Date 
			System.out.println("In date sort");
			for(int i = 0; i< myEmails.size() ; i++){
				for(int j = i + 1 ; j< myEmails.size() ; j++){
					Date mydate1 = (myEmails.get(i)).getMailDate();
					Date mydate2 = (myEmails.get(j)).getMailDate();			
					if(mydate1.compareTo(mydate2) > 0) {// mydate1 > mydate2
						
						Email Email1 = (Email)(myEmails.get(j)).clone();
						Email temp = (Email)(myEmails.get(i)).clone();
						myEmails.set(i, Email1);
						myEmails.set(j, temp);
					}
				}
			}
			System.out.println("Elements of Emails sorted according to Date:");    
	        for (int i = 0; i < myEmails.size(); i++) {     
	            System.out.print( myEmails.get(i) + "\n");    
	        }   
		}else { // sort by Importance
			System.out.println("In priority sort");
			 for (int i = 0; i < myEmails.size() ; i++) {     
            for (int j = i+1; j < myEmails.size() ; j++) {  
            	int prior1 = (myEmails.get(i)).getPriority();
            	int prior2 = (myEmails.get(j)).getPriority();
               if(prior1 <= prior2) {    
            	   	Email Email1 = (Email)(myEmails.get(j)).clone();
					Email temp = (Email)(myEmails.get(i)).clone();
					myEmails.set(i, Email1);
					myEmails.set(j, temp);
               }     
            }     
        } 
			 System.out.println("Elements of Emails sorted according to Priority:");    
		        for (int i = 0; i < myEmails.size(); i++) {     
		            System.out.print( myEmails.get(i) + "\n");    
		        } 

		} 
		
	}
	
	public static void checkValidityTrashFolder(Folder trashFolder) {
		Date Today = new Date();
		ArrayList<Integer> emailsIndicesToBeRemoved = new ArrayList<Integer>();
		for(int i = 0 ; i < trashFolder.getEmails().size() ; i++) {
			Email email = trashFolder.getEmails().get(i);
			double timeDiff = (Today.getTime() - email.getMailDate().getTime()) / 1000.0  / 60.0 / 60.0 / 24.0; 
			if( timeDiff >= 30) 
				emailsIndicesToBeRemoved.add(i);
		}
		if(emailsIndicesToBeRemoved.size() > 0) {
			for(int i = 0 ; i < emailsIndicesToBeRemoved.size() ; i++) {
				System.out.println("Deleting Email With Subject: " + trashFolder.getEmails().get(i).getSubject());
				trashFolder.getEmails().remove(i);
			}
		} else 
			System.out.println("Checked: Emails In Trash Folder are still valid.");
	}
	
	public static void renameFolder(ArrayList<Folder> folders, int index, String newName) {
		folders.get(index).setName(newName);
	}
	
}
