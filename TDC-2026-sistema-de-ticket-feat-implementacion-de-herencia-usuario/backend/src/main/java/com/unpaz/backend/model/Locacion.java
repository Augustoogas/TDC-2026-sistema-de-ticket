package com.unpaz.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    private String nombre;
    private String direccion;
    private int capacidad;
    
    private String asientos; 

}