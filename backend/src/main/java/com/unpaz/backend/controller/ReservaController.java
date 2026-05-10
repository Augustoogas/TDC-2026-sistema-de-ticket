package com.unpaz.backend.controller;

import com.unpaz.backend.dto.ReservaDTO;
import com.unpaz.backend.service.IReservaService;
import com.unpaz.backend.model.*;
import com.unpaz.backend.repository.SectorRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "*")
public class ReservaController {

    private final IReservaService reservaservice;
    private final SectorRepository sectorRepo;

    public ReservaController(IReservaService reservaService, SectorRepository sectorRepo){
        this.reservaservice = reservaService;
        this.sectorRepo = sectorRepo;
    }

    // Solo el ADMIN debería poder ver el listado global de todas las reservas
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReservaDTO>> getAllReservas() {
        List<ReservaDTO> lista = reservaservice.listarTodas(); 
        return ResponseEntity.ok(lista);
    }

    // Tanto CLIENTE como ADMIN pueden crear reservas
    @PostMapping("/{clienteId}")
    @PreAuthorize("hasAnyRole('CLIENTE', 'ADMIN')")
    public ResponseEntity<ReservaDTO> crear(@Valid @RequestBody ReservaDTO dto, @PathVariable Long clienteId) {
        ReservaDTO respuesta = reservaservice.crearReservaTemporal(dto, clienteId);
        return ResponseEntity.ok(respuesta);
    }

    // Acceso para usuarios autenticados para consultar sectores antes de reservar
    @GetMapping("/sector/{id}")
    @PreAuthorize("hasAnyRole('CLIENTE', 'ADMIN')")
    public ResponseEntity<Sector> obtenerSector(@PathVariable Long id){
        Sector sector = sectorRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Sector no encontrado"));
            return ResponseEntity.ok(sector);
    }
}