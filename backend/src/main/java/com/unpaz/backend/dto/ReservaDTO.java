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
    
    @Schema(description = "Asientos bloqueados", example = "Sector C - 12, 13")
    private String detalleAsientos;

    private Double montoTotal;

    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private EstadoReserva estado;

    @Schema(description = "Vencimiento de la reserva temporal")
    private LocalDateTime fechaExpiracion;



}
