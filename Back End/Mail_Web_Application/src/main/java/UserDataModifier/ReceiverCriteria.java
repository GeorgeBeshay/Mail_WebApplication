package UserDataModifier;

import java.util.ArrayList;

import ComponentsPackage.Email;
import ComponentsPackage.Folder;

public class ReceiverCriteria implements EmailCriteria{

	@Override
	public ArrayList<Email> meetCriteria(Folder folder, String receiver) {
		ArrayList<Email> emailsSentTo = new ArrayList<Email>();
		for(Email tempMail : folder.getEmails()) {
			if(tempMail.getReceiver().contains(receiver)) {
				emailsSentTo.add(tempMail);
			}
		}
		return emailsSentTo;
	}

}
