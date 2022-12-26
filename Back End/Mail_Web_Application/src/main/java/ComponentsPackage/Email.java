package ComponentsPackage;

import java.util.*;

public class Email {
	// ------------------------ Class Fields ------------------------
	private String sender;
	private String receiver;
	private String subject;
	private String body;
	private ArrayList<Object> attachments;
	// ------------------------ Class Constructors ------------------------
	public Email() {
		this.attachments = new ArrayList<Object>();
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
	

}
