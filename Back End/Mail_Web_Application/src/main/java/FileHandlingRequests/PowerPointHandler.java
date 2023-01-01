package FileHandlingRequests;

public class PowerPointHandler implements FileHandler{

	private FileHandler nextHandler;
	@Override
	public void setNextHandler() {
		this.nextHandler = null;
	}

	@Override
	public String serviceHandler(String extension) {
		this.setNextHandler();
		if(extension.equals("ppt") || extension.equals("pptx")) {
			return "PowerPoint\\";
		}
		return "Other\\";
	}

}
