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
    private Cliente cliente; // En lugar de Long usuarioId

    @ManyToOne
    @JoinColumn(name = "evento_id")
    private Evento evento;   // En lugar de Long eventoId

    private Double montoTotal;
    
    @Enumerated(EnumType.STRING)
    private EstadoReserva estado;
    
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaExpiracion;
}