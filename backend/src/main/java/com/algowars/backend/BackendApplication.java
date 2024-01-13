package com.algowars.backend;

import com.algowars.backend.common.events.EventPublisher;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	EventPublisher eventPublisher(ApplicationEventPublisher applicationEventPublisher) {
		return applicationEventPublisher::publishEvent;
	}
}
