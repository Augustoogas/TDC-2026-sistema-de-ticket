package com.unpaz.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;
@Entity
@Data
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne 
    @JoinColumn(name = "cliente_id")
    private Cliente cliente; 

    @ManyToOne 
    @JoinColumn(name = "evento_id")
    private Evento evento;  

    private Double montoTotal;
    
    @Enumerated(EnumType.STRING)
    private EstadoReserva estado;
    
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaExpiracion;

    // agreagmos cantidad de entradas por sector y relacionamos reserva con el sector
    @ManyToOne
    @JoinColumn(name =  "sector_id")
    private Sector sector;
    private int cantidadEntradas;
}