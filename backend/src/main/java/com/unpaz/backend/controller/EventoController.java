package com.unpaz.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.unpaz.backend.model.Evento;
import com.unpaz.backend.repository.EventoRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "*")
@Tag(name = "Eventos", description = "Endpoints para la gestión y consulta de eventos")
public class EventoController {

    @Autowired
    private EventoRepository eventoRepository;

    @Operation(
        summary = "Listar todos los eventos", 
        description = "Endpoint público. Retorna la lista completa de eventos cargados en el sistema."
    )
    @ApiResponse(responseCode = "200", description = "Lista de eventos obtenida con éxito")
    @GetMapping
    public ResponseEntity<List<Evento>> getAllEventos() {
        return ResponseEntity.ok(eventoRepository.findAll());
    }

    @Operation(
        summary = "Crear un nuevo evento", 
        description = "Endpoint restringido. Solo los usuarios con rol ADMIN pueden dar de alta eventos.",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponse(responseCode = "201", description = "Evento creado con éxito")
    @ApiResponse(responseCode = "403", description = "Acceso denegado - Se requiere rol ADMIN")
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Evento> createEvento(@RequestBody Evento evento) {
        Evento nuevoEvento = eventoRepository.save(evento);
        return new ResponseEntity<>(nuevoEvento, HttpStatus.CREATED);
    }
}