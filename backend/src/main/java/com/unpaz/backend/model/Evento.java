package com.unpaz.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Evento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventoId; // El ID siempre tiene que ser una variable simple

    private String titulo;
    private String tipo;
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "admin_id") 
    private Admin creador;

    @ManyToOne // Agregamos esto para que no tire el error de Locacion
    @JoinColumn(name = "locacion_evento_id")
    private Locacion locacion;
}
