package FileHandlingRequests;

public class VideoHandler implements FileHandler{

	private FileHandler nextHandler;
	@Override
	public void setNextHandler() {
		this.nextHandler = new TextHandler();
	}

	@Override
	public String serviceHandler(String extension) {
		this.setNextHandler();
		if(extension.equals("mp4")) {
			return "Videos\\";
		}
		return this.nextHandler.serviceHandler(extension);
	}

}
