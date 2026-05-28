package com.unpaz.backend.service;

import java.util.List;

import com.unpaz.backend.dto.EventoDto;

public interface EventoService {
    List<EventoDto> listarEventos();
    List<EventoDto> buscarEventos(String q);
    EventoDto crearEvento(EventoDto eventoDto);
}
