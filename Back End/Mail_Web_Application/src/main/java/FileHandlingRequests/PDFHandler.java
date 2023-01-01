package FileHandlingRequests;

public class PDFHandler implements FileHandler{

	private FileHandler nextHandler;
	@Override
	public void setNextHandler() {
		this.nextHandler = new ImageHandler();
	}

	@Override
	public String serviceHandler(String extension) {
		this.setNextHandler();
		if(extension.equals("pdf")) {
			return "PDF\\";
		}
		return this.nextHandler.serviceHandler(extension);
	}

}
