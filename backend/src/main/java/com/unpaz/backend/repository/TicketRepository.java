package com.unpaz.backend.repository;

import com.unpaz.backend.model.Ticket;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    @Query("SELECT t FROM Ticket t JOIN FETCH t.evento e JOIN FETCH e.locacion JOIN FETCH t.reserva r JOIN FETCH r.sector WHERE r.cliente.id = :clienteId")
    List<Ticket> findByReservaClienteId(Long clienteId);
}