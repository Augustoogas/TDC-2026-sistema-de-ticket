package com.unpaz.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Locacion {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLocacion; 
   
    // SE ELIMINÓ: private Locacion locacion; (Esto causaba el error)
    
    private String nombre;
    private String direccion;
    private int capacidad;
    private String asientos; 
}