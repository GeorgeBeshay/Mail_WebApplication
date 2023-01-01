package FileHandlingRequests;

public class TextHandler implements FileHandler{

	private FileHandler nextHandler;
	@Override
	public void setNextHandler() {
		this.nextHandler = new PowerPointHandler();
	}

	@Override
	public String serviceHandler(String extension) {
		this.setNextHandler();
		if(extension.equals("txt")) {
			return "Text\\";
		}
		return this.nextHandler.serviceHandler(extension);
	}

}
