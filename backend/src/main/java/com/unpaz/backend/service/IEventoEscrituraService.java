package com.unpaz.backend.service;

import com.unpaz.backend.model.Evento;

public interface IEventoEscrituraService {
        // solo admins 
    Evento guardarEvento(Evento evento);
    Evento editarEvento(Evento evento);
    void eliminarEvento(Long id);
}
