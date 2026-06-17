package com.unpaz.backend.service;

import java.util.List;

import com.unpaz.backend.dto.EventoDto;

public interface EventoService {
    List<EventoDto> listarEventos();
    List<EventoDto> buscarEventos(String q);
    EventoDto obtenerPorId(Long id);
    EventoDto crearEvento(EventoDto eventoDto);
    EventoDto actualizarEvento(Long id, EventoDto eventoDto);
    void eliminarEvento(Long id);
}
