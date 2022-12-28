package UserDataModifier;

import java.util.*;
import ComponentsPackage.*;

public interface EmailCriteria {
	
	public ArrayList<Email> meetCriteria(Folder folder, String sender);
	
}
