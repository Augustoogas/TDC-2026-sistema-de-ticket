package com.unpaz.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SectorDTO {

    private Long sectorId;
    private String nombre;
    private Integer capacidad;
    private Integer disponibles;
    private Long locacionId;
    private Integer precio;
    private String color;
}