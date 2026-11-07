package com.ejemplo.estudiantes.repository;

import com.ejemplo.estudiantes.model.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {
    List<Estudiante> findByNombreContainingIgnoreCaseOrApellidoContainingIgnoreCase(String nombre, String apellido);
}
