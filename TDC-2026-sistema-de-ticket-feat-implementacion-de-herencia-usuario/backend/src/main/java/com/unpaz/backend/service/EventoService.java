package com.unpaz.backend.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.unpaz.backend.model.Evento;
import com.unpaz.backend.repository.*;

@Service
public class EventoService implements IEventoEscrituraService, IEventoLecturaService{

    @Autowired
    private EventoRepository eventoRepository;

    /// Metodos de lectura
    @Override
    public List<Evento> buscarEvento(String filtro) {

        // definir el buscador por
        if (filtro == null || filtro.trim().isEmpty()){
            return eventoRepository.findAll();
        }
        return eventoRepository.findByTituloContainingOrTipoContaining(filtro, filtro);
    }
    @Override
    public Evento obtenerporId(Long id) {
       return eventoRepository.findById(id).orElse(null);
    }

    @Override
    public List<Evento> listarTodos() {
        return eventoRepository.findAll();
    }

    /// Metodos de escritura
    @Override
    public Evento guardarEvento(Evento evento) {
        // podria verificar si el evento ya existe.
        return eventoRepository.save(evento);
    }

    @Override
    public Evento editarEvento(Evento evento) {
        // este metodo deberia buscar si existe el evento, si existe, setear nueva informacion, y por ultimo guardar el evento con save()

        if (evento.getEventoId() != null && eventoRepository.existsById(evento.getEventoId())){
            return eventoRepository.save(evento);
        } else {
            throw new RuntimeException("No se puede editar el evento");
        }
    }

    @Override
    public void eliminarEvento(Long id) {
        if(!eventoRepository.existsById(id)) {
            throw new RuntimeException("No se encontro el evento");
        }
        eventoRepository.deleteById(id);
    }
    

}
