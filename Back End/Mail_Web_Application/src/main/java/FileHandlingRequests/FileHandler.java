package FileHandlingRequests;

public interface FileHandler {
	
	void setNextHandler();
	
	String serviceHandler(String extension);
	
}
