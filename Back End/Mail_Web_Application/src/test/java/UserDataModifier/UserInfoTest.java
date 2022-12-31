package UserDataModifier;

import static org.junit.jupiter.api.Assertions.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.junit.jupiter.api.Test;

import ComponentsPackage.User;

class UserInfoTest {

	@Test
	void testBirthDate() {
		User user = new User("test@gmail.com", "123", "2022-12-29");
		Date birthDate = user.getBirthDate();
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");  
		String strDate = dateFormat.format(birthDate);  
		assertEquals("2022-12-29", strDate);
	
	
	}

}
