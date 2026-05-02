package com.unpaz.backend.controller;

import com.unpaz.backend.dto.ReservaDTO;
import com.unpaz.backend.service.IReservaService;
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

    // Tu método GET adaptado al Service de tu compañero
    @GetMapping
    public ResponseEntity<List<ReservaDTO>> getAllReservas() {
        
        List<ReservaDTO> lista = reservaservice.listarTodas(); 
        return ResponseEntity.ok(lista);
    }

    // 
    @PostMapping("/{clienteId}")
    public ResponseEntity<ReservaDTO> crear(@RequestBody ReservaDTO dto, @PathVariable Long clienteId) {
        ReservaDTO respuesta = reservaservice.crearReservaTemporal(dto, clienteId);
        return ResponseEntity.ok(respuesta);
    }
}