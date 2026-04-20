package com.portfolio.matchmaker.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate() {
        // Configure ObjectMapper to read snake_case JSON from Python agent
        ObjectMapper snakeCaseMapper = new ObjectMapper();
        snakeCaseMapper.setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE);
        snakeCaseMapper.registerModule(new JavaTimeModule());

        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        converter.setObjectMapper(snakeCaseMapper);

        RestTemplate restTemplate = new RestTemplate();
        // Replace the default converter with our snake_case one
        restTemplate.setMessageConverters(List.of(converter));
        return restTemplate;
    }
}
