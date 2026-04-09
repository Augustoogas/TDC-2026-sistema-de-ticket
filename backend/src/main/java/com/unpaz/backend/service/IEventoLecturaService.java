package com.unpaz.backend.service;

import java.util.List;
import com.unpaz.backend.model.Evento;

public interface IEventoLecturaService {
        // usuarios y admins
    List<Evento> buscarEvento (String filtro);
    Evento obtenerporId(Long id);
    List<Evento> listarTodos();
}
