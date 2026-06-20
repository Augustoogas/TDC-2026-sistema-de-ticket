package com.unpaz.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Evento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventoId; // El ID siempre tiene que ser una variable simple

    private String titulo;
    private Long categoriaId;
    private String tipo;
    private String descripcion;

    private String imagen;
    private String fecha;

    @ManyToOne 
    @JoinColumn(name = "admin_id") 
    @JsonIgnoreProperties("eventos")
    private Admin creador;

    @ManyToOne
    @JoinColumn(name = "locacion_evento_id")
    @JsonIgnoreProperties({"sectores", "eventos"})
    private Locacion locacion;

}
