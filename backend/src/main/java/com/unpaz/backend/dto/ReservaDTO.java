package com.unpaz.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

import com.unpaz.backend.model.EstadoReserva;

import io.swagger.v3.oas.annotations.media.Schema;

@Data
public class ReservaDTO {

    @Schema(description = "ID de la reserva", example= "1")
    private Long reservaId;

    @Schema(description = "Nombre del evento", example = "Coldplay: Music For The Spheres")
    private String nombreEvento;

    @Schema(description = "ID del evento", example = "1")
    private Long eventoId;

    @Schema(description = "ID del sector", example = "1")
    private Long sectorId;
    
    @Schema(description = "Nombre del sector", example = "VIP")
    private String nombreSector;

    @Schema(description = "Cantidad de entradas", example = "3")
    private int cantidadEntradas;
    
    @Schema(description = "Monto total", example = "15000")
    private Double montoTotal;

    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private EstadoReserva estado;

    @Schema(description = "Vencimiento de la reserva temporal")
    private LocalDateTime fechaExpiracion;
}
