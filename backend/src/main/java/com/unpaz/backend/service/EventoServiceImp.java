package com.unpaz.backend.service;

import com.unpaz.backend.dto.EventoDto;
import com.unpaz.backend.mapper.EventoMapper;
import com.unpaz.backend.model.Admin;
import com.unpaz.backend.model.Evento;
import com.unpaz.backend.model.Locacion;
import com.unpaz.backend.repository.AdminRepository;
import com.unpaz.backend.repository.EventoRepository;
import com.unpaz.backend.repository.LocacionRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventoServiceImp {

    private final EventoRepository eventoRepository;
    private final AdminRepository adminRepository;
    private final LocacionRepository locacionRepository;
    private final EventoMapper eventoMapper;


    public List<EventoDto> listarEventos(){

        return eventoRepository.findAll()
                .stream()
                .map(eventoMapper::mapearDTO)
                .toList();
    }

    public List<EventoDto> buscarEventos(String q){

        return eventoRepository
                .findByTituloContainingIgnoreCaseOrTipoContainingIgnoreCaseOrLocacionNombreContainingIgnoreCase(q,q,q)
                .stream()
                .map(eventoMapper::mapearDTO)
                .collect(Collectors.toList());
    }


    // creacion del evento

    public EventoDto crearEvento(EventoDto eventoDto){
        Admin creador = adminRepository.findById(eventoDto.getCreadorId())
                .orElseThrow(() -> new RuntimeException("Creadr no fue encontrado"));

        Locacion locacion = locacionRepository.findById(eventoDto.getLocacionId())
                .orElseThrow(() -> new RuntimeException("Locación no encontrada"));

        Evento evento = new Evento();

        evento.setTitulo(eventoDto.getTitulo());
        evento.setTipo(eventoDto.getTipo());
        evento.setDescripcion(eventoDto.getDescripcion());

        evento.setCreador(creador);
        evento.setLocacion(locacion);

        Evento eventoGuardado = eventoRepository.save(evento);

        return eventoMapper.mapearDTO(eventoGuardado);

    }
}