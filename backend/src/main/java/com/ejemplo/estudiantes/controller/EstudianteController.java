package com.ejemplo.estudiantes.controller;

import com.ejemplo.estudiantes.model.Estudiante;
import com.ejemplo.estudiantes.service.EstudianteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estudiantes")
public class EstudianteController {

    private final EstudianteService servicio;

    public EstudianteController(EstudianteService servicio) {
        this.servicio = servicio;
    }

    // GET /api/estudiantes  o  /api/estudiantes?nombre=ana
    @GetMapping
    public List<Estudiante> listar(@RequestParam(required = false) String nombre) {
        return servicio.listar(nombre);
    }

    @GetMapping("/{id}")
    public Estudiante obtener(@PathVariable Long id) {
        return servicio.obtener(id);
    }

    @PostMapping
    public ResponseEntity<Estudiante> crear(@Valid @RequestBody Estudiante estudiante) {
        return ResponseEntity.status(HttpStatus.CREATED).body(servicio.crear(estudiante));
    }

    @PutMapping("/{id}")
    public Estudiante actualizar(@PathVariable Long id, @Valid @RequestBody Estudiante estudiante) {
        return servicio.actualizar(id, estudiante);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        servicio.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
