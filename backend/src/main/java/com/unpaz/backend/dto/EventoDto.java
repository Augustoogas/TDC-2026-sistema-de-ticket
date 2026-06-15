package com.unpaz.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description= "Objeto de transferencia para festionar los eventos" )
public class EventoDto {

    @Schema(description = "ID unico de la reserva", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long eventoId;

    @Schema(description = "Titulo del evento", example = "Charla Tech: Java y Spring Boot")
    private String titulo;

    @Schema(description = "Tipo de evento", example = "Conferencia")
    private String tipo;
    
    @Schema(description = "Descripcion detallada del evento", example = "Java y SpringBoot")
    private String descripcion;

    @Schema(description = "ID del usuario creador del evento", example = "2")
    private Long creadorId;

    @Schema(description = "Nombre del creador del evento", example = "Admin")
    private String creadorNombre;

    @Schema(description = "ID de la locacion donde sera el evento", example = "2")
    private Long locacionId;

    @Schema(description = "Nombre de la locacion del evento", example = "Centro Cultural UNPAZ")
    private String locacionNombre;

    @Schema(description = "URL de la imagen asociada al Evento", example = "https://www.pexels.com/es-es/foto/jugando-musica-piano-instrumento-musical-16035577/")
    private String imagen;

    @Schema(description = "Fecha y hora del evento", example = "2026-11-15T21:00:00")
    private String fecha;
}