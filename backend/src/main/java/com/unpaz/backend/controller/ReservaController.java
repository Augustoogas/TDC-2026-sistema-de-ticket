package com.unpaz.backend.controller;

import com.unpaz.backend.dto.ReservaDTO;
import com.unpaz.backend.service.IReservaService;
import com.unpaz.backend.model.*;
import com.unpaz.backend.repository.SectorRepository;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas") // 
@CrossOrigin(origins = "*")
public class ReservaController {

    @Autowired
    private IReservaService reservaservice;
    private SectorRepository sectorRepo;
    
    // constructor para evitar el error nullpointerexc
    public ReservaController(IReservaService reservaService, SectorRepository sectorRepo){
        this.reservaservice = reservaService;
        this.sectorRepo = sectorRepo;
    }

    // Tu método GET adaptado al Service de tu compañero
    @GetMapping
    public ResponseEntity<List<ReservaDTO>> getAllReservas() {
        
        List<ReservaDTO> lista = reservaservice.listarTodas(); 
        return ResponseEntity.ok(lista);
    }

    // 
    @PostMapping("/{clienteId}")
    public ResponseEntity<ReservaDTO> crear(@Valid @RequestBody ReservaDTO dto, @PathVariable Long clienteId) {
        ReservaDTO respuesta = reservaservice.crearReservaTemporal(dto, clienteId);
        return ResponseEntity.ok(respuesta);
    }
// --------------

    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<ReservaDTO> cancelarReserva(@PathVariable("id") Long reservaId){
        ReservaDTO reservaCancelada = reservaservice.cancelarReserva(reservaId);
        return ResponseEntity.ok(reservaCancelada);
    }

    @PatchMapping("/{id}/confirmar")
    public ResponseEntity<ReservaDTO> confirmarReserva(@PathVariable("id") Long reservaId){
        ReservaDTO reservaConfirmada = reservaservice.confirmarReserva(reservaId);
        return ResponseEntity.ok(reservaConfirmada);
    }

    // para ver lo de sectores (solo prueba) -- separalo en su propio controller 
    @GetMapping("/sector/{id}")
    public ResponseEntity<Sector> obtenerSector(@PathVariable Long id){
        Sector sector = sectorRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Sector no encontrado"));
            return ResponseEntity.ok(sector);
}
}