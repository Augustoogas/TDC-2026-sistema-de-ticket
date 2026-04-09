package com.unpaz.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
// @Document(collection = "eventos") -> NoSQl
import lombok.Data;


@Entity
@Data
public class Evento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventoId;

    private String titulo;
    private String tipo;
    private String descripcion;
    private Locacion locacion;
    // separar en interfaz el buscar por evento


   

}
