package com.unpaz.backend.controller;

import com.unpaz.backend.dto.ReservaDTO;
import com.unpaz.backend.service.ReservaService;
import com.unpaz.backend.model.*;
import com.unpaz.backend.repository.SectorRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "*")
@Tag(name = "Reservas", description = "Endpoints para la gestión de reservas de tickets")
@SecurityRequirement(name = "bearerAuth") // La mayoría requiere autenticación
public class ReservaController {

    private final ReservaService reservaservice;
    private final SectorRepository sectorRepo;

    public ReservaController(ReservaService reservaService, SectorRepository sectorRepo){
        this.reservaservice = reservaService;
        this.sectorRepo = sectorRepo;
    }

    @Operation(
        summary = "Listado global de reservas", 
        description = "Endpoint restringido. Permite al administrador ver todas las reservas del sistema."
    )
    @ApiResponse(responseCode = "200", description = "Lista obtenida correctamente")
    @ApiResponse(responseCode = "403", description = "Acceso denegado - Se requiere rol ADMIN")
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReservaDTO>> getAllReservas() {
        List<ReservaDTO> lista = reservaservice.listarTodas(); 
        return ResponseEntity.ok(lista);
    }

    @Operation(
        summary = "Crear reserva temporal", 
        description = "Crea una reserva en estado pendiente. Accesible para Clientes y Admins."
    )
    @ApiResponse(responseCode = "201", description = "Reserva creada con éxito")
    @PostMapping("/{clienteId}")
    @PreAuthorize("hasAnyRole('CLIENTE', 'ADMIN')")
    public ResponseEntity<?> crear(@Valid @RequestBody ReservaDTO dto, @PathVariable Long clienteId) {
        try{
            ReservaDTO respuesta = reservaservice.crearReservaTemporal(dto, clienteId);
            return ResponseEntity.status(HttpStatus.CREATED).body(respuesta);
        } catch (RuntimeException e){
            return ResponseEntity.status(409).body(e.getMessage());
        }
    }

    @Operation(summary = "Cancelar una reserva", description = "Cambia el estado de la reserva a CANCELADA.")
    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<ReservaDTO> cancelarReserva(@PathVariable("id") Long reservaId){
        ReservaDTO reservaCancelada = reservaservice.cancelarReserva(reservaId);
        return ResponseEntity.ok(reservaCancelada);
    }

    @Operation(summary = "Confirmar una reserva", description = "Cambia el estado de la reserva a CONFIRMADA.")
    @PatchMapping("/{id}/confirmar")
    public ResponseEntity<ReservaDTO> confirmarReserva(@PathVariable("id") Long reservaId){
        ReservaDTO reservaConfirmada = reservaservice.confirmarReserva(reservaId);
        return ResponseEntity.ok(reservaConfirmada);
    }

    @Operation(
        summary = "Consultar datos de un sector", 
        description = "Permite obtener la disponibilidad y detalles de un sector antes de reservar."
    )
    @GetMapping("/sector/{id}")
    @PreAuthorize("hasAnyRole('CLIENTE', 'ADMIN')")
    public ResponseEntity<Sector> obtenerSector(@PathVariable Long id){
        Sector sector = sectorRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Sector no encontrado"));
            return ResponseEntity.ok(sector);
    }
}