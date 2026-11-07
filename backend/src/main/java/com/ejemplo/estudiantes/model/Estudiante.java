package com.ejemplo.estudiantes.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "estudiantes")
public class Estudiante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 60, message = "El nombre no puede superar 60 caracteres")
    private String nombre;

    @NotBlank(message = "El apellido es obligatorio")
    @Size(max = 60, message = "El apellido no puede superar 60 caracteres")
    private String apellido;

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El correo no tiene un formato válido")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "La carrera es obligatoria")
    private String carrera;

    @NotNull(message = "La edad es obligatoria")
    @Min(value = 15, message = "La edad mínima es 15")
    @Max(value = 100, message = "La edad máxima es 100")
    private Integer edad;

    public Estudiante() {}

    public Estudiante(String nombre, String apellido, String email, String carrera, Integer edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.carrera = carrera;
        this.edad = edad;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getCarrera() { return carrera; }
    public void setCarrera(String carrera) { this.carrera = carrera; }
    public Integer getEdad() { return edad; }
    public void setEdad(Integer edad) { this.edad = edad; }
}
