package com.unpaz.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.unpaz.backend.model.Evento;
import com.unpaz.backend.repository.EventoRepository;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "*") // Para que Augusto no tenga problemas de CORS
public class EventoController {

    @Autowired
    private EventoRepository eventoRepository;

    // Acceso público: Cualquiera puede ver los eventos disponibles
    @GetMapping
    public ResponseEntity<List<Evento>> getAllEventos() {
        return ResponseEntity.ok(eventoRepository.findAll());
    }

    // Acceso restringido: Solo el ADMIN puede dar de alta nuevos eventos
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Evento> createEvento(@RequestBody Evento evento) {
        Evento nuevoEvento = eventoRepository.save(evento);
        return new ResponseEntity<>(nuevoEvento, HttpStatus.CREATED);
    }
}