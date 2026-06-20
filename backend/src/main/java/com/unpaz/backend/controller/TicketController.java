package com.unpaz.backend.controller;

import com.unpaz.backend.model.Ticket;
import com.unpaz.backend.service.TicketPdfService;
import com.unpaz.backend.service.TicketService;
import com.unpaz.backend.repository.TicketRepository;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;


import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "*")
@Tag(name = "Tickets", description = "Endpoints para la generación y consulta de comprobantes de entrada")
public class TicketController {
    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @Autowired
    private TicketPdfService ticketPdfService;

    @Autowired
    private TicketRepository ticketRepository;

    @Operation(
        summary = "Listar todos los tickets", 
        description = "Retorna el historial completo de tickets generados en el sistema. Generalmente usado por administración."
    )
    @ApiResponse(responseCode = "200", description = "Lista de tickets obtenida con éxito")
    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    @Operation(
        summary = "Obtener ticket por ID", 
        description = "Busca un ticket específico. Útil para mostrar el detalle de una compra finalizada."
    )
    @ApiResponse(responseCode = "200", description = "Ticket encontrado")
    @ApiResponse(responseCode = "404", description = "Ticket no encontrado")
    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable Long id) {
        return ticketRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(
        summary = "Obtener tickets por cliente",
        description = "Devuelve todos los tickets asociados al cliente mediante su reserva."
    )
    @ApiResponse(responseCode = "200", description = "Lista de tickets obtenida")
    @GetMapping("/cliente/{clienteId}")
    public List<Ticket> getTicketsByClienteId(@PathVariable Long clienteId) {
        return ticketService.findByClienteId(clienteId);
    }

    @Operation(
        summary = "Generar nuevo ticket (Compra)", 
        description = "Registra la compra definitiva y genera el ticket. Requiere los datos de la reserva confirmada.",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponse(responseCode = "200", description = "Ticket generado con éxito")
    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket) {
        // Podríamos sumar validaciones de stock aquí en el futuro
        return ticketRepository.save(ticket);
    }
    
    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> descargarTicket(@PathVariable Long id) {
    	Ticket ticket = ticketService.findById(id);
        byte[] pdf = ticketPdfService.generarTicketPDF(ticket);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("filename", "ticket-" + id + ".pdf");

        return new ResponseEntity<>(pdf, headers, HttpStatus.OK);
    }
}