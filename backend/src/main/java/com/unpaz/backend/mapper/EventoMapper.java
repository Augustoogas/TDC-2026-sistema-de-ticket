package com.unpaz.backend.mapper;

import org.springframework.stereotype.Component;

import com.unpaz.backend.dto.EventoDto;
import com.unpaz.backend.model.Evento;

@Component
// @RequiredArgsConstructor
public class EventoMapper {

        public EventoDto mapearDTO(Evento evento){

        EventoDto dto = new EventoDto();

        dto.setEventoId(evento.getEventoId());
        dto.setTitulo(evento.getTitulo());
        dto.setTipo(evento.getTipo());
        dto.setDescripcion(evento.getDescripcion());
        dto.setFecha(evento.getFecha());
        dto.setImagen(evento.getImagen());

        if(evento.getCreador() != null){
            dto.setCreadorId(evento.getCreador().getUsuarioId());
            dto.setCreadorNombre(evento.getCreador().getNombre() + " " + evento.getCreador().getApellido());
        }

        if(evento.getLocacion() != null){
            dto.setLocacionId(evento.getLocacion().getIdLocacion());
            dto.setLocacionNombre(evento.getLocacion().getNombre());
        }
        return dto;
    }

}
