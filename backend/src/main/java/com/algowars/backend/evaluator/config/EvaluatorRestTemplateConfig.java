package com.algowars.backend.evaluator.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

public class EvaluatorRestTemplateConfig {

    @Value("${evaluator.api.key}")
    private String apiKey;

    @Value("${evaluator.host}")
    private String host;

    @Bean
    @Qualifier("evaluatorRestTemplate")
    public RestTemplate evaluatorRestTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getInterceptors().add((request, body, execution) -> {
            request.getHeaders().add("content-type", "application/json");
            request.getHeaders().add("Content-Type", "application/json");
            request.getHeaders().add("X-RapidAPI-Key", apiKey);
            request.getHeaders().add("X-RapidAPI-Host", host);

            return execution.execute(request, body);
        });
        return restTemplate;
    }

}
