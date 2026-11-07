package com.ejemplo.estudiantes.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    // Uno o varios orígenes separados por comas
    @Value("${app.cors.origen}")
    private String origenes;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String[] permitidos = Arrays.stream(origenes.split(","))
                .map(String::trim)
                .map(o -> o.endsWith("/") ? o.substring(0, o.length() - 1) : o)
                .filter(o -> !o.isEmpty())
                .toArray(String[]::new);

        registry.addMapping("/api/**")
                .allowedOrigins(permitidos)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }
}
