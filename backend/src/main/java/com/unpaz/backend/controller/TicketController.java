package com.unpaz.backend.controller;

import com.unpaz.backend.model.Ticket;
import com.unpaz.backend.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "*") // Para que el Front pueda conectarse sin problemas de CORS
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    // Obtener todos los tickets
    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    // Obtener un ticket por ID
    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable int id) {
        return ticketRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Crear un nuevo ticket (Comprar)
    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket) {
        // Aquí podrías agregar lógica extra, como validar si hay stock
        return ticketRepository.save(ticket);
    }
}