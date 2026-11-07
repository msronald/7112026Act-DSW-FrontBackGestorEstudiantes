package com.ejemplo.estudiantes.service;

import com.ejemplo.estudiantes.exception.RecursoNoEncontradoException;
import com.ejemplo.estudiantes.model.Estudiante;
import com.ejemplo.estudiantes.repository.EstudianteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstudianteService {

    private final EstudianteRepository repositorio;

    public EstudianteService(EstudianteRepository repositorio) {
        this.repositorio = repositorio;
    }

    public List<Estudiante> listar(String nombre) {
        if (nombre == null || nombre.isBlank()) {
            return repositorio.findAll();
        }
        String texto = nombre.trim();
        return repositorio.findByNombreContainingIgnoreCaseOrApellidoContainingIgnoreCase(texto, texto);
    }

    public Estudiante obtener(Long id) {
        return repositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("No existe un estudiante con id " + id));
    }

    public Estudiante crear(Estudiante estudiante) {
        estudiante.setId(null);
        return repositorio.saveAndFlush(estudiante);
    }

    public Estudiante actualizar(Long id, Estudiante datos) {
        Estudiante existente = obtener(id);
        existente.setNombre(datos.getNombre());
        existente.setApellido(datos.getApellido());
        existente.setEmail(datos.getEmail());
        existente.setCarrera(datos.getCarrera());
        existente.setEdad(datos.getEdad());
        return repositorio.saveAndFlush(existente);
    }

    public void eliminar(Long id) {
        if (!repositorio.existsById(id)) {
            throw new RecursoNoEncontradoException("No existe un estudiante con id " + id);
        }
        repositorio.deleteById(id);
    }
}
