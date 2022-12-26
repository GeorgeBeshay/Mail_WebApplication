package ApplicationMainPackage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = { "RequestsPackage", "ApplicationMainPackage"} )
public class MailWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(MailWebApplication.class, args);
	}

}
