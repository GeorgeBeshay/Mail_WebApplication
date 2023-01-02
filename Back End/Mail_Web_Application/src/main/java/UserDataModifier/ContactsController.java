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

}
