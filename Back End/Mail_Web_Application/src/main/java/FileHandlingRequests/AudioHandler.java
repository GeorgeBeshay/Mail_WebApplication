package FileHandlingRequests;

public class AudioHandler implements FileHandler{

	private FileHandler nextHandler;
	@Override
	public void setNextHandler() {
		this.nextHandler = new VideoHandler();
	}

	@Override
	public String serviceHandler(String extension) {
		this.setNextHandler();
		if(extension.equals("mp3") || extension.equals("m4a")) {
			return "Audios\\";
		}
		return this.nextHandler.serviceHandler(extension);
	}

}
