package UserDataModifier;

import java.util.ArrayList;

import ComponentsPackage.Email;
import ComponentsPackage.Folder;

public class SenderCriteria implements EmailCriteria{

	@Override
	public ArrayList<Email> meetCriteria(Folder folder, String sender) {
		ArrayList<Email> emailsSentFrom = new ArrayList<Email>();
		for(Email tempMail : folder.getEmails()) {
			if(tempMail.getSender().contains(sender)) {
				emailsSentFrom.add(tempMail);
			}
		}
		return emailsSentFrom;
	}

}
