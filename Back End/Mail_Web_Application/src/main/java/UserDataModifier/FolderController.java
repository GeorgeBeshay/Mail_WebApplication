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
	
	public static void sortPriority(Folder folder , boolean dateFlag) {
		ArrayList <Email> myEmails = folder.getEmails();
//		myEmails.get(0)
		if(dateFlag) { // sort by Date 
			
//			 for (int i = 0; i < arr.length; i++) {     
//		            for (int j = i+1; j < arr.length; j++) {     
//		               if(arr[i] > arr[j]) {    
//		                   temp = arr[i];    
//		                   arr[i] = arr[j];    
//		                   arr[j] = temp;    
//		               }     
//		            }     
//		        } 
			for(int i = 0; i< myEmails.size() ; i++){
				for(int j = i + 1 ; j< myEmails.size() ; j++){
					Date mydate1 = (myEmails.get(i)).getMailDate();
					Date mydate2 = (myEmails.get(j)).getMailDate();
					if(mydate1.compareTo(mydate2) > 0) {// mydate1 > mydate2
						Date tempDate = mydate1;
						mydate1 = mydate2;
						mydate2 = tempDate;
					}
				}
			}
			System.out.println("Elements of array sorted in ascending order: ");    
	        for (int i = 0; i < myEmails.size(); i++) {     
	            System.out.print( myEmails.get(i) + " ");    
	        }   
		}else {
			
		}
		
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
}
