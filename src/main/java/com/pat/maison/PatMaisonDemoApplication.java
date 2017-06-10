package com.pat.maison;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;

@SpringBootApplication
public class PatMaisonDemoApplication  extends SpringBootServletInitializer{

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(PatMaisonDemoApplication.class);
	}

	public static void main(String[] args) throws Exception {
		SpringApplication.run(PatMaisonDemoApplication.class, args);
		/*new SpringApplicationBuilder()
				.sources(PatMaisonDemoApplication.class)
				.run(args); */
	}
}
