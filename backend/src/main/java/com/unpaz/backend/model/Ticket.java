package com.unpaz.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ticketId;
	
    private float precio;
	
    @ManyToOne // Un evento puede tener muchos tickets vendidos
    @JoinColumn(name = "id_evento")
    private Evento evento;
}
