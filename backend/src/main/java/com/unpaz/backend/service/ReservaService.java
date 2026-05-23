package com.unpaz.backend.service;

import com.unpaz.backend.dto.ReservaDTO;
import java.util.List;
public interface ReservaService {
    ReservaDTO crearReservaTemporal(ReservaDTO reserva, Long reservaId);
    ReservaDTO confirmarReserva(Long reservaId);
    ReservaDTO cancelarReserva(Long reservaId);
    List<ReservaDTO> listarTodas();
}
