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

}
