package com.unpaz.backend.service;

import java.util.List;

import com.unpaz.backend.dto.EventoDto;
import com.unpaz.backend.model.Evento;

public interface IEventoService {
    List<EventoDto> listarEventos();
    List<EventoDto> buscarEventos(String q);
    EventoDto crearEvento(EventoDto eventoDto);
    EventoDto mapearDTO(Evento evento);
}
