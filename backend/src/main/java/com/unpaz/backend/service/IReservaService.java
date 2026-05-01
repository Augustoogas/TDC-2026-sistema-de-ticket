package com.unpaz.backend.service;

import com.unpaz.backend.dto.ReservaDTO;

public interface IReservaService {
    ReservaDTO crearReservaTemporal(ReservaDTO reserva, Long reservaId);

}
