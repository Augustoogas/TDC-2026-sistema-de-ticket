package com.unpaz.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Sector {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sectorId;
    
    private String nombre;
    private Integer capacidad;
    private Integer disponibles;
    private Integer precio;
    private String color;
    
    @ManyToOne
    @JoinColumn(name = "locacion_id")
    @JsonIgnore
    private Locacion locacion;
}