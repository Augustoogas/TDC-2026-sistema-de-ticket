package com.unpaz.backend.service;

import org.springframework.stereotype.Service;

import com.unpaz.backend.model.Ticket;
import com.unpaz.backend.repository.TicketRepository;

@Service

public class TicketService {
	private final TicketRepository ticketRepository;
	public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }
	public Ticket findById(Long id) {
	    return ticketRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Ticket no encontrado con id: " + id));
	}
}
