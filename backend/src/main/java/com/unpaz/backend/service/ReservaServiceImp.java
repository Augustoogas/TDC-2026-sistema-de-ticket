package com.unpaz.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

import com.unpaz.backend.dto.ReservaDTO;
import com.unpaz.backend.repository.EventoRepository;
import com.unpaz.backend.repository.ReservaRepository;
import com.unpaz.backend.repository.UsuarioRepository;
import com.unpaz.backend.model.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservaServiceImp implements IReservaService {

    private final ReservaRepository reservaRepo;
    private final EventoRepository eventoRepo;
    private final UsuarioRepository user;

    private final static int MINUTOS_EXPRIRACION = 15;

    
    @Override
    public List<ReservaDTO> listarTodas() {
        
        List<Reserva> reservas = reservaRepo.findAll();
        
        return reservas.stream()
                       .map(this::mapearDTO)
                       .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ReservaDTO crearReservaTemporal(ReservaDTO reservadto, Long clienteId) {
        validarDatosEntrada(reservadto, clienteId);
        
        Usuario usuario = user.findById(clienteId)
            .orElseThrow(() -> new RuntimeException("Cliente no encontrado con ID: " + clienteId));
            
        if(!(usuario instanceof Cliente cliente)){
            throw new RuntimeException("El usuario no es un cliente válido");
        }
        Evento evento = eventoRepo.findById(reservadto.getEventoId())
            .orElseThrow(() -> new RuntimeException("Evento no encontrado con ID:  " + reservadto.getEventoId()));

        Reserva reserva = crearReserva(reservadto, cliente, evento);
        Reserva reservaGuardada = reservaRepo.save(reserva);

        return mapearDTO(reservaGuardada);
    }

    private void validarDatosEntrada(ReservaDTO reservadto, Long clienteId){
        if(clienteId == null){
            throw new RuntimeException("El ID del cliente es oblgatorio.");
        }
        if(reservadto == null){
            throw new RuntimeException("La reserva no puede ser nula");
        }
        if (reservadto.getEventoId() == null) {
            throw new RuntimeException("El ID del evento es obligatorio");
        }
    }

    private Reserva crearReserva(ReservaDTO reservadto, Cliente cliente, Evento evento){
        LocalDateTime ahora = LocalDateTime.now();
        
        Reserva reserva = new Reserva();
        reserva.setCliente(cliente);
        reserva.setEvento(evento);
        reserva.setMontoTotal(reservadto.getMontoTotal());
        reserva.setEstado(EstadoReserva.PENDIENTE);
        reserva.setFechaCreacion(ahora);
        reserva.setFechaExpiracion(ahora.plusMinutes(MINUTOS_EXPRIRACION));

        return reserva;
    }

    private ReservaDTO mapearDTO(Reserva reserva){
        ReservaDTO reservaDTO = new ReservaDTO();
        reservaDTO.setReservaId(reserva.getId());
        reservaDTO.setEstado(reserva.getEstado());
        reservaDTO.setFechaExpiracion(reserva.getFechaExpiracion());
        reservaDTO.setMontoTotal(reserva.getMontoTotal());
        reservaDTO.setEventoId(reserva.getEvento().getEventoId());
        reservaDTO.setNombreEvento(reserva.getEvento().getTitulo());

        return reservaDTO;
    }
}