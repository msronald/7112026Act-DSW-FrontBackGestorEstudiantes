package com.ejemplo.estudiantes.config;

import com.ejemplo.estudiantes.model.Estudiante;
import com.ejemplo.estudiantes.repository.EstudianteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DatosIniciales {

    @Bean
    CommandLineRunner cargarDatos(EstudianteRepository repositorio) {
        return args -> {
            if (repositorio.count() == 0) {
                repositorio.saveAll(List.of(
                        new Estudiante("Lucía", "Quispe", "lucia.quispe@correo.com", "Ingeniería de Sistemas", 20),
                        new Estudiante("Mateo", "Rojas", "mateo.rojas@correo.com", "Administración", 22),
                        new Estudiante("Valeria", "Huamán", "valeria.huaman@correo.com", "Psicología", 19)
                ));
            }
        };
    }
}
