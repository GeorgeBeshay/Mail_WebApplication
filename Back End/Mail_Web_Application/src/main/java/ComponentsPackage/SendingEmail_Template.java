package ComponentsPackage;

public class SendingEmail_Template {
	
	private User activeUser;
	private Email email;
	public SendingEmail_Template() {}
	public SendingEmail_Template(User activeUser, Email email) {
		super();
		this.activeUser = activeUser;
		this.email = email;
	}
	public User getActiveUser() {
		return activeUser;
	}
	public void setActiveUser(User activeUser) {
		this.activeUser = activeUser;
	}
	public Email getEmail() {
		return email;
	}
	public void setEmail(Email email) {
		this.email = email;
	}
	
}
