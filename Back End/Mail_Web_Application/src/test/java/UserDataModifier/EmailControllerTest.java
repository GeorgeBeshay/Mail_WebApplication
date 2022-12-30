package UserDataModifier;

import java.util.*;
import ComponentsPackage.*;
import org.junit.jupiter.api.Test;
import org.junit.Assert;

class EmailControllerTest {
	
	ArrayList<Folder> foldersUnderTesting = new ArrayList<Folder>();
	
	void generate() {
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
		Email tempMail2_ = new Email();
		tempMail2_.setSubject("Codeforces Div 2 Contest.");
		tempMail2_.setBody("This is an automatic email sent to all CF users. COPY");
		tempMail2_.setSender("Codeforces");
		// ------------------- Separator -------------------		
		Email tempMail3 = new Email();
		tempMail3.setSubject("Amazon Adv");
		tempMail3.setSender("Amazon Company");
		// ------------------- Separator -------------------
		Email tempMail4 = new Email();
		tempMail4.setSubject("Facebook notification alert");
		tempMail4.setBody("Hey user we've identified a login to your account from a non familiar IP.");
		tempMail4.setSender("Facebook");
		// ------------------- Separator -------------------
		Email tempMail4_ = new Email();
		tempMail4_.setSubject("Facebook password alert");
		tempMail4_.setBody("Hey user your facebook password has been changed recently.");
		tempMail4_.setSender("Facebook");
		// ------------------- Separator -------------------
		Email tempMail5 = new Email();
		tempMail5.setSubject("Meeting Reminder");
		tempMail5.setReceiver("Receiver1");
		// ------------------- Separator -------------------
		Email tempMail6 = new Email();
		tempMail6.setSubject("Meeting Reminder");
		tempMail6.setReceiver("Receiver2");
		// ------------------- Separator -------------------
		Email tempMail7 = new Email();
		tempMail7.setSubject("Meeting Reminder COPY");
		tempMail7.setReceiver("Receiver2");
		// ------------------- Separator -------------------
		Folder tempFolder1 = new Folder("1");
		Folder tempFolder2 = new Folder("2");
		Folder tempFolder3 = new Folder("3");
		tempFolder1.addEmail(tempMail1);
		tempFolder1.addEmail(tempMail2);
		tempFolder1.addEmail(tempMail2_);
		tempFolder2.addEmail(tempMail3);
		tempFolder2.addEmail(tempMail4);
		tempFolder2.addEmail(tempMail4_);
		tempFolder3.addEmail(tempMail5);
		tempFolder3.addEmail(tempMail6);
		tempFolder3.addEmail(tempMail7);
		this.foldersUnderTesting.add(tempFolder1);
		this.foldersUnderTesting.add(tempFolder2);
		this.foldersUnderTesting.add(tempFolder3);
	}
	
	@Test
	void test1_search() {
		this.generate();
		Assert.assertEquals(this.foldersUnderTesting.get(1).getEmails().get(1), EmailController.searchForEmail(this.foldersUnderTesting, "Facebook notification alert"));
	}
	
	@Test
	void test2_search() {
		this.generate();
		Assert.assertEquals(this.foldersUnderTesting.get(2).getEmails().get(0), EmailController.searchForEmail(this.foldersUnderTesting, "Meeting Reminder"));
	}
	
	@Test
	void test3_search() {
		this.generate();
		Assert.assertEquals(this.foldersUnderTesting.get(0).getEmails().get(1), EmailController.searchForEmail(this.foldersUnderTesting, "Codeforces Div 2 Contest."));
	}
	
	@Test
	void test4_search() {
		this.generate();
		Assert.assertEquals(null  , EmailController.searchForEmail(this.foldersUnderTesting, "Wrong Subject"));
	}
	
	@Test
	void test5_filter() {
		this.generate();
		ArrayList<Email> temp = new ArrayList<Email>();
		temp.add(this.foldersUnderTesting.get(0).getEmails().get(1));
		temp.add(this.foldersUnderTesting.get(0).getEmails().get(2));
		Assert.assertArrayEquals(temp.toArray(), 
				EmailController.getEmailsSentFrom(this.foldersUnderTesting.get(0), "Codeforces").toArray());
	}
	
	@Test
	void test6_filter() {
		this.generate();
		ArrayList<Email> temp = new ArrayList<Email>();
		temp.add(this.foldersUnderTesting.get(1).getEmails().get(1));
		temp.add(this.foldersUnderTesting.get(1).getEmails().get(2));
		Assert.assertArrayEquals(temp.toArray(), 
				EmailController.getEmailsSentFrom(this.foldersUnderTesting.get(1), "Facebook").toArray());
	}
	
	@Test
	void test7_filter() {
		this.generate();
		ArrayList<Email> temp = new ArrayList<Email>();
		temp.add(this.foldersUnderTesting.get(0).getEmails().get(1));
		temp.add(this.foldersUnderTesting.get(0).getEmails().get(2));
		Assert.assertArrayEquals(temp.toArray(), 
				EmailController.getEmailsWithSubject(this.foldersUnderTesting.get(0), "Codeforces Div 2 Contest.").toArray());
	}
	
	@Test
	void test8_filter() {
		this.generate();
		ArrayList<Email> temp = new ArrayList<Email>();
		temp.add(this.foldersUnderTesting.get(2).getEmails().get(1));
		temp.add(this.foldersUnderTesting.get(2).getEmails().get(2));
		Assert.assertArrayEquals(temp.toArray(), 
				EmailController.getEmailsSentTo(this.foldersUnderTesting.get(2), "Receiver2").toArray());
	}
	
	

}
