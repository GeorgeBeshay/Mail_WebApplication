package UserDataModifier;

import java.util.ArrayList;

import ComponentsPackage.Email;
import ComponentsPackage.Folder;

public class SubjectCriteria implements EmailCriteria{

	@Override
	public ArrayList<Email> meetCriteria(Folder folder, String subject) {
		ArrayList<Email> emailsWithSubject = new ArrayList<Email>();
		for(Email tempMail : folder.getEmails()) {
			if(tempMail.getSubject().contains(subject)) {
				emailsWithSubject.add(tempMail);
			}
		}
		return emailsWithSubject;
	}

}
