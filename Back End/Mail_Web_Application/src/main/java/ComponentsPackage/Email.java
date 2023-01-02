package ComponentsPackage;

import java.util.*;

public class Email implements Cloneable{
	// ------------------------ Class Fields ------------------------
	private String sender;
	private String receiver;
	private String subject;
	private String body;
	private Date mailDate;
	private int priority;
	private ArrayList<String> attachments;
	// ------------------------ Class Constructors ------------------------
	public Email() {
		this.attachments = new ArrayList<String>();
		this.mailDate = new Date();
	}

	// ------------------------ Class Methods ------------------------
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	
	public ArrayList<String> getAttachments() {
		return attachments;
	}

	public void setAttachments(ArrayList<String> attachments) {
		this.attachments = attachments;
	}

	public String getSender() {
		return sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
	}
	public String getReceiver() {
		return receiver;
	}
	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}
	public Date getMailDate() {
		return mailDate;
	}
	public void setMailDate(Date mailDate) {
		this.mailDate = mailDate;
	}
	public int getPriority() {
		return priority;
	}
	public void setPriority(int priority) {
		this.priority = priority;
	}
	// --------------------------- Separator ---------------------------
	@Override
	public String toString() {
		return "Email [sender=" + sender + ", receiver=" + receiver + ", subject=" + subject + ", body=" + body
				+ ", mailDate=" + mailDate + ", priority=" + priority + ", attachments=" + attachments + "]";
	}
	
	@Override
	public Email clone(){  
	    try{  
	        return (Email) super.clone();  
	    }catch(Exception e){ 
	    	e.printStackTrace();
	    	return null;
	    }
		
	}
	

}
