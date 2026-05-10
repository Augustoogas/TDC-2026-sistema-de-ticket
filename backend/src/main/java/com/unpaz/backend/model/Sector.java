package com.unpaz.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Sector {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sectorId;
    
    private String nombre;
    private int capacidad;
    private int disponibles;

    @ManyToOne
    @JoinColumn(name = "locacion_id")
    private Locacion locacion;
}