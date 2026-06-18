package com.unpaz.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LocacionDTO {
    private Long idLocacion; 
    private String nombre;
    private String direccion;
    private int capacidad;
    private String asientos; 
}