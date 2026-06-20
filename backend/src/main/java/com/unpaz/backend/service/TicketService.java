package com.unpaz.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unpaz.backend.model.Ticket;
import com.unpaz.backend.repository.TicketRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TicketService {
	private final TicketRepository ticketRepository;

	@Transactional(readOnly = true)
	public Ticket findById(Long id) {
	    Optional<Ticket> ticketOpt = ticketRepository.findById(id);
	    if (!ticketOpt.isPresent()) {
	        throw new RuntimeException("Ticket no encontrado con id: " + id);
	    }
	    return ticketOpt.get();
	}

	@Transactional(readOnly = true)
	public List<Ticket> findByClienteId(Long clienteId) {
	    return ticketRepository.findByReservaClienteId(clienteId);
	}
}

