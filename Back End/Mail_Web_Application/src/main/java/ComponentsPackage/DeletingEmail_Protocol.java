package ComponentsPackage;

public class DeletingEmail_Protocol {
	User activeUser;
	int activeFolderIndex;
	int activeEmailIndex;
	public DeletingEmail_Protocol() {
	}
	public DeletingEmail_Protocol(User activeUser, int activeFolderIndex, int activeEmailIndex) {
		super();
		this.activeUser = activeUser;
		this.activeFolderIndex = activeFolderIndex;
		this.activeEmailIndex = activeEmailIndex;
	}
	public User getActiveUser() {
		return activeUser;
	}
	public void setActiveUser(User activeUser) {
		this.activeUser = activeUser;
	}
	public int getActiveFolderIndex() {
		return activeFolderIndex;
	}
	public void setActiveFolderIndex(int activeFolderIndex) {
		this.activeFolderIndex = activeFolderIndex;
	}
	public int getActiveEmailIndex() {
		return activeEmailIndex;
	}
	public void setActiveEmailIndex(int activeEmailIndex) {
		this.activeEmailIndex = activeEmailIndex;
	}
	

}
