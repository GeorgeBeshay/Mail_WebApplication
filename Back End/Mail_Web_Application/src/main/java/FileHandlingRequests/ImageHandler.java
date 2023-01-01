package FileHandlingRequests;

public class ImageHandler implements FileHandler{

	private FileHandler nextHandler;
	@Override
	public void setNextHandler() {
		this.nextHandler = new AudioHandler();
	}

	@Override
	public String serviceHandler(String extension) {
		this.setNextHandler();
		if(extension.equals("png") || extension.equals("jpg") || extension.equals("jpeg") || extension.equals("gif")) {
			return "Images\\";
		}
		return this.nextHandler.serviceHandler(extension);
	}

}
