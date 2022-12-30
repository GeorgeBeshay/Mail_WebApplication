package UserDataModifier;

import ComponentsPackage.*;
import org.junit.jupiter.api.Test;
import org.junit.Assert;
import java.util.*;

class FolderControllerTest {

	@SuppressWarnings("deprecation")
	@Test
	void test_1() {
		// ------------------- Separator -------------------
		Email tempMail1 = new Email();
		tempMail1.setSubject("Birthday Party Invitation");
		tempMail1.setBody("Dear John, I'm inviting you to my birthday party on ...");
		tempMail1.setSender("John Doe");
		// ------------------- Separator -------------------
		Email tempMail2 = new Email();
		tempMail2.setSubject("Codeforces Div 2 Contest.");
		tempMail2.setBody("This is an automatic email sent to all CF users.");
		tempMail2.setSender("Codeforces");
		// ------------------- Separator -------------------
		Folder tempFolder = new Folder("1");
		tempFolder.addEmail(tempMail1);
		tempFolder.addEmail(tempMail2);
		Folder tempFolder2 = new Folder("2");
		tempFolder2.addEmail(tempMail1);
		tempFolder2.addEmail(tempMail2);
		// ------------------- Separator -------------------
		tempFolder.getEmails().remove(tempMail2);
		FolderController.deleteEmailWithSubject(tempFolder2, "Codeforces Div 2 Contest.");
		System.out.println(tempFolder.getEmails().toString());
		System.out.println(tempFolder2.getEmails().toString());
		Assert.assertEquals(tempFolder.getEmails().toArray(), tempFolder2.getEmails().toArray());
	}
	
	@SuppressWarnings("deprecation")
	@Test
	void test_2() {
		// ------------------- Separator -------------------
		Email tempMail1 = new Email();
		tempMail1.setSubject("Birthday Party Invitation");
		tempMail1.setBody("Dear John, I'm inviting you to my birthday party on ...");
		tempMail1.setSender("John Doe");
		// ------------------- Separator -------------------
		Email tempMail2 = new Email();
		tempMail2.setSubject("Codeforces Div 2 Contest.");
		tempMail2.setBody("This is an automatic email sent to all CF users.");
		tempMail2.setSender("Codeforces");
		// ------------------- Separator -------------------
		Email tempMail3 = new Email();
		tempMail3.setSubject("Codeforces Div 2 Contest.");
		tempMail3.setBody("This is an automatic email sent to all CF users.");
		tempMail3.setSender("Codeforces");
		// ------------------- Separator -------------------
		Folder tempFolder = new Folder("3");
		tempFolder.addEmail(tempMail1);
		tempFolder.addEmail(tempMail2);
		tempFolder.addEmail(tempMail3);
		// ------------------- Separator -------------------
		ArrayList<Email> tempEmails = new ArrayList<Email>();
		tempEmails.add(tempMail1);
		FolderController.deleteEmailsWithCommonAttribute(tempFolder, EmailController.getEmailsSentFrom(tempFolder, "Codeforces"));
		Assert.assertEquals(tempEmails.toArray(), tempFolder.getEmails().toArray());
		// ------------------- Separator -------------------	
	}

}
