package ComponentsPackage;

import java.util.*;

public class Contact implements Cloneable {
	
	String name;
	ArrayList<String> emails;
	
	public Contact(String name,ArrayList<String> emails) {
		this.name = name;
		this.emails =emails;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public ArrayList<String> getEmails() {
		return emails;
	}
	public void setEmails(ArrayList<String> emails) {
		this.emails = emails;
	}
	
	@Override
	public Contact clone(){  
	    try{  
	        return (Contact) super.clone();  
	    }catch(Exception e){ 
	    	e.printStackTrace();
	    	return null;
	    }
		
	}

	@Override
	public String toString() {
		return "Contact [name=" + name + ", emails=" + emails + "]";
	}

}
