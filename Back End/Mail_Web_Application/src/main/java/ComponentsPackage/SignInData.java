package ComponentsPackage;

public class SignInData {
	
	private String emailAddress;
	private String emailPassword;
	public SignInData(String emailAddress, String emailPassword) {
		super();
		this.emailAddress = emailAddress;
		this.emailPassword = emailPassword;
	}
	public String getEmailAddress() {
		return emailAddress;
	}
	public String getEmailPassword() {
		return emailPassword;
	}

}
