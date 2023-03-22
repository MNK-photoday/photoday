package com.photoday.photoday;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableScheduling
@SpringBootApplication
@EnableJpaAuditing
@EnableAspectJAutoProxy
public class PhotodayApplication {

	public static void main(String[] args) {
		SpringApplication.run(PhotodayApplication.class, args);
	}

}
