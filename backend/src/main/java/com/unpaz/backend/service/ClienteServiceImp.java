package com.unpaz.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.unpaz.backend.dto.ReservaDTO;
import com.unpaz.backend.mapper.ReservaMapper;
import com.unpaz.backend.model.Cliente;
import com.unpaz.backend.model.EstadoReserva;
import com.unpaz.backend.model.Reserva;
import com.unpaz.backend.repository.ClienteRepository;
import com.unpaz.backend.repository.ReservaRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class ClienteServiceImp implements ClienteService {
    private final ClienteRepository clienteRepository;
    private final ReservaRepository reservaRepository;
    private final ReservaMapper reservaMapper;

    @Override
    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }

    @Override
    public List<ReservaDTO> obtenerReservasCliente(String email) {
        List<Reserva> reservas = reservaRepository.findByClienteEmail(email);

        return reservas.stream()
            .filter(reserva -> EstadoReserva.PAGADA.equals(reserva.getEstado()))
            .map(reservaMapper::meppearDTO)
            .collect(Collectors.toList());
            //solo las que estan pagadas
    }
}
