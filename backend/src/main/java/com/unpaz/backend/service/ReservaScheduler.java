package com.unpaz.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.unpaz.backend.model.EstadoReserva;
import com.unpaz.backend.model.Reserva;
import com.unpaz.backend.model.Sector;
import com.unpaz.backend.repository.ReservaRepository;
import com.unpaz.backend.repository.SectorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservaScheduler {

    private final ReservaRepository reservaRepository;
    private final SectorRepository sectorRepository;

    @Scheduled(fixedRate = 60000) // seria cada un minuto
    public void liberarReservasExpiradas(){
        List<Reserva> reservasExpiradas = reservaRepository.findByEstadoAndFechaExpiracionBefore(
            EstadoReserva.PENDIENTE, LocalDateTime.now()
        );

        for(Reserva reserva : reservasExpiradas){
            reserva.setEstado(EstadoReserva.EXPIRADA);
        
            Sector sector = reserva.getSector();
            sector.setDisponibles(sector.getDisponibles() + reserva.getCantidadEntradas());

            sectorRepository.save(sector);
            reservaRepository.save(reserva);
        };
    }
}
