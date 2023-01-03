package UserDataModifier;

import java.util.ArrayList;

import ComponentsPackage.Email;
import ComponentsPackage.Folder;

public class BodyCriteria implements EmailCriteria{

	@Override
	public ArrayList<Email> meetCriteria(Folder folder, String body) {
		ArrayList<Email> emailsContaining = new ArrayList<Email>();
		for(Email tempMail : folder.getEmails()) {
			if(tempMail.getBody().contains(body)) {
				emailsContaining.add(tempMail);
			}
		}
		return emailsContaining;
	}

}
