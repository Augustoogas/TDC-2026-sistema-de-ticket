package com.unpaz.backend.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.unpaz.backend.model.Reserva;
import com.unpaz.backend.repository.ReservaRepository;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;

    @GetMapping
    public List<Reserva> getAllReservas() {
        return reservaRepository.findAll();
    }

    @PostMapping
    public Reserva createReserva(@RequestBody Reserva reserva) {
        // Podés setear la fecha de creación automáticamente si no viene en el JSON
        if (reserva.getFechaCreacion() == null) {
            reserva.setFechaCreacion(LocalDateTime.now());
        }
        return reservaRepository.save(reserva);
    }
}