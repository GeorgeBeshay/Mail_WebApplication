package FileHandlingRequests;

import org.springframework.stereotype.Service;

@Service
public class FileServer {

	private static FileServer fileServer;
	
	private FileServer() {}
	
	public static FileServer getInstanceFileServer() {
		if(fileServer == null) {
			fileServer = new FileServer();
		}
		return fileServer;
	}
	
	public static String getExtension(String name) {
		String extension = "";

		int i = name.lastIndexOf('.');
		if (i > 0) {
		    extension = name.substring(i+1);
		}
		
		return extension;
	}
	
	public String getPath(String name) {
		String extension = getExtension(name);
		FileHandler firstHandler = new PDFHandler();
		
		return firstHandler.serviceHandler(extension);
	}
}
