package ComponentsPackage;

import java.util.*;

public class Email {
	// ------------------------ Class Fields ------------------------
	private String sender;
	private String receiver;
	private String subject;
	private String body;
	private Date mailDate;
	private int priority;
	private ArrayList<Object> attachments;
	// ------------------------ Class Constructors ------------------------
	public Email() {
		this.attachments = new ArrayList<Object>();
		this.mailDate = new Date();
	}
//	public Email(String sender, String receiver, String subject, String body, Date mailDate, int priority,
//			ArrayList<Object> attachments) {
//		super();
//		this.sender = sender;
//		this.receiver = receiver;
//		this.subject = subject;
//		this.body = body;
//		this.mailDate = mailDate;
//		this.priority = priority;
//		this.attachments = attachments;
//	}
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
	public ArrayList<Object> getAttachments() {
		return attachments;
	}
	public void setAttachments(ArrayList<Object> attachments) {
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
				+ ", attachments=" + attachments + "]";
	}
	

}
