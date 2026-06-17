package com.unpaz.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.unpaz.backend.dto.EventoDto;
import com.unpaz.backend.model.Evento;
import com.unpaz.backend.repository.EventoRepository;
import com.unpaz.backend.service.EventoServiceImp;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "*")
@Tag(name = "Eventos", description = "Endpoints para la gestión y consulta de eventos")
public class EventoController {

    @Autowired
    private EventoRepository eventoRepository;
    @Autowired
    private EventoServiceImp eventoService;
    
    // Vista de todos los eventos
    @Operation(
        summary = "Listar todos los eventos", 
        description = "Endpoint público. Retorna la lista completa de eventos cargados en el sistema."
    )
    @ApiResponse(responseCode = "200", description = "Lista de eventos obtenida con éxito")
    @GetMapping
    public ResponseEntity<List<EventoDto>> getAllEventos() {
        return ResponseEntity.ok(eventoService.listarEventos());
    }


    // obtener el evento concreto
   @Operation(
        summary = "Obtener evento por ID",
        description = "Retorna los datos de un evento específico"
    )
    @ApiResponse(responseCode = "200", description = "Evento encontrado")
    @ApiResponse(responseCode = "404", description = "Evento no encontrado")
    @GetMapping("/{id}")
    public ResponseEntity<EventoDto> obtenerEvento(@PathVariable Long id) {
        return ResponseEntity.ok(eventoService.obtenerPorId(id));
    }


    // busqueda de eventos
    @Operation(
        summary = "Buscar evento",
        description = "Endpoint publico, retorna los eventos que cumplan con los parametros ? "
    )
    @ApiResponse(responseCode = "200", description = "Resultado de eventos buscados.")
    @GetMapping("/buscar")
    public ResponseEntity<List<EventoDto>> buscar(@RequestParam String q){
        return ResponseEntity.ok(eventoService.buscarEventos(q));
    }

    // Creacion de eventos
    @Operation(
        summary = "Crear un nuevo evento", 
        description = "Endpoint restringido. Solo los usuarios con rol ADMIN pueden dar de alta eventos.",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponse(responseCode = "201", description = "Evento creado con éxito")
    @ApiResponse(responseCode = "403", description = "Acceso denegado - Se requiere rol ADMIN")
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EventoDto> createEvento(@Valid @RequestBody EventoDto eventoDto) {
        EventoDto nuevoEvento = eventoService.crearEvento(eventoDto);
        return new ResponseEntity<>(nuevoEvento, HttpStatus.CREATED);
    }
    
 // --- ACTUALIZAR EVENTO ---
    @Operation(
        summary = "Actualizar un evento existente", 
        description = "Endpoint restringido. Permite a un ADMIN modificar los datos de un evento por su ID.",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponse(responseCode = "200", description = "Evento actualizado con éxito")
    @ApiResponse(responseCode = "404", description = "Evento no encontrado")
    @ApiResponse(responseCode = "403", description = "Acceso denegado - Se requiere rol ADMIN")
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EventoDto> updateEvento(@PathVariable Long id, @Valid @RequestBody EventoDto eventoDto) {
        EventoDto eventoActualizado = eventoService.actualizarEvento(id, eventoDto);
        return ResponseEntity.ok(eventoActualizado);
    }

    // --- ELIMINAR EVENTO ---
    @Operation(
        summary = "Eliminar un evento por ID", 
        description = "Endpoint restringido. Elimina físicamente el evento de la base de datos. ¡Atención con las reservas asociadas!",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponse(responseCode = "200", description = "Evento eliminado con éxito")
    @ApiResponse(responseCode = "404", description = "Evento no encontrado")
    @ApiResponse(responseCode = "403", description = "Acceso denegado - Se requiere rol ADMIN")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteEvento(@PathVariable Long id) {
        try {
            eventoService.eliminarEvento(id);
            return ResponseEntity.ok().body("Evento con ID " + id + " eliminado correctamente.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    
}