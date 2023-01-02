package UserDataModifier;

import java.util.ArrayList;

import ComponentsPackage.Contact;

public class ContactsController {
	public static void sort(ArrayList<Contact> contacts) {
		
        for (int i = 0; i < contacts.size(); i++) {
            for (int j = i + 1; j < contacts.size(); j++) {
               String name1= contacts.get(i).getName();
               String name2= contacts.get(j).getName();
                // to compare one string with other strings
                if (name1.compareTo(name2) > 0) {
                	Contact temp=(Contact)(contacts.get(i)).clone();
                	Contact c1=(Contact)(contacts.get(j)).clone();
                	contacts.set(i, c1);
                	contacts.set(j, temp);
                }
            }
        }
        System.out.println("Elements of contacts sorted alphapiticaly:");    
        for (int i = 0; i < contacts.size(); i++) {     
            System.out.print( contacts.get(i).toString() + "\n");    
        }
	}
	
	public static ArrayList<Contact> search(ArrayList<Contact> contacts, String key) {
		ArrayList<Contact> searchResult=new ArrayList<Contact>();
        for (int i = 0; i < contacts.size(); i++) {
        	Contact c= contacts.get(i);
        	if((c.getName()).contains(key)) {
        		searchResult.add(c);
        	}else {
        		for(int j=0;j<c.getEmails().size();j++) {
        			if((c.getEmails().get(j)).contains(key)) {
                		searchResult.add(c);
                		break;
        			}
        		} 
            
        	}
        }
        System.out.println("Elements of contacts sorted alphapiticaly:");    
        for (int i = 0; i < searchResult.size(); i++) {     
            System.out.print( searchResult.get(i).toString() + "\n");    
        }
        return searchResult;
	}

}
