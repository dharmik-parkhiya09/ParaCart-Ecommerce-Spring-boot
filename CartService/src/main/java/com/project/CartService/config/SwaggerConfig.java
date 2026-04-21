package com.project.CartService.config;


import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI cartServiceAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("Cart Service API")
                        .description("API documentation for Cart microservice")
                        .version("1.0"));
    }
}