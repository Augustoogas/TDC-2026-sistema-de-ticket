package com.unpaz.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;
import com.unpaz.backend.model.EstadoReserva;
import io.swagger.v3.oas.annotations.media.Schema;

@Data
@Schema(description = "Objeto de transferencia para gestionar las reservas de entradas")
public class ReservaDTO {

    @Schema(description = "ID único de la reserva", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long reservaId;

    @Schema(description = "Nombre del evento asociado", example = "Charla Tech: Java y Spring Boot")
    private String nombreEvento;

    @Schema(description = "ID del evento al que se desea asistir", example = "1")
    private Long eventoId;

    @Schema(description = "ID del sector seleccionado (VIP, General, etc.)", example = "1")
    private Long sectorId;
    
    @Schema(description = "Nombre del sector para visualización", example = "VIP")
    private String nombreSector;

    @Schema(description = "Cantidad de entradas reservadas por el cliente", example = "2")
    private int cantidadEntradas;
    
    @Schema(description = "Monto total calculado para la reserva", example = "45000.00")
    private Double montoTotal;

    @Schema(
        description = "Estado actual de la reserva", 
        example = "PENDIENTE", 
        accessMode = Schema.AccessMode.READ_ONLY
    )
    private EstadoReserva estado;

    @Schema(
        description = "Fecha y hora en que la reserva temporal deja de ser válida", 
        example = "2026-05-13T21:30:00",
        type = "string",
        format = "date-time"
    )
    private LocalDateTime fechaExpiracion;
}