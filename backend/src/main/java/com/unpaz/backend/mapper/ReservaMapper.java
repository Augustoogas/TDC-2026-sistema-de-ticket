package com.unpaz.backend.mapper;

import org.springframework.stereotype.Component;

import com.unpaz.backend.dto.ReservaDTO;
import com.unpaz.backend.model.Reserva;

@Component
public class ReservaMapper {

        // crear un paquete aparte para el mappe{

    public ReservaDTO meppearDTO(Reserva reserva){
        if(reserva == null) return null;

        ReservaDTO dto = new ReservaDTO();
        dto.setReservaId(reserva.getId());
        dto.setEventoId(reserva.getEvento().getEventoId());
        dto.setNombreEvento(reserva.getEvento().getTitulo());
        dto.setMontoTotal(reserva.getMontoTotal());
        dto.setEstado(reserva.getEstado());
        dto.setFechaExpiracion(reserva.getFechaExpiracion());
        dto.setSectorId(reserva.getSector().getSectorId());
        dto.setCantidadEntradas(reserva.getCantidadEntradas());
        dto.setNombreSector(reserva.getSector().getNombre());

        return dto;
    }
}
