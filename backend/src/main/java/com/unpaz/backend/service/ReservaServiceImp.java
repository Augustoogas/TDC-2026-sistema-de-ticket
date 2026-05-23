package com.unpaz.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.unpaz.backend.dto.ReservaDTO;
import com.unpaz.backend.mapper.ReservaMapper;
import com.unpaz.backend.repository.EventoRepository;
import com.unpaz.backend.repository.ReservaRepository;
import com.unpaz.backend.repository.SectorRepository;
import com.unpaz.backend.repository.UsuarioRepository;
import com.unpaz.backend.model.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor
public class ReservaServiceImp implements ReservaService {

    private final ReservaRepository reservaRepository;
    private final EventoRepository eventoRepository;
    private final UsuarioRepository userRepository;
    private final SectorRepository sectorRepository;
    private final ReservaMapper reservaMapper;

    private final static int MINUTOS_EXPIRACION = 15;
    private final static int MAXIMO_ENTRADAS = 10;

    @Override
    public List<ReservaDTO> listarTodas() {
        
        List<Reserva> reservas = reservaRepository.findAll();
        
        return reservas.stream()
                       .map(reservaMapper::meppearDTO)
                       .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ReservaDTO crearReservaTemporal( ReservaDTO reservaDTO, Long clienteId) {

        validarDatosEntrada(reservaDTO, clienteId);

        Usuario usuario = userRepository.findById(clienteId)
            .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        if(!(usuario instanceof Cliente cliente)){
            throw new RuntimeException("El usuario no es un cliente válido");}

        Evento evento = eventoRepository.findById(reservaDTO.getEventoId())
            .orElseThrow(() -> new RuntimeException("Evento no encontrado"));
        Sector sector = sectorRepository.findById(reservaDTO.getSectorId())
            .orElseThrow(() ->new RuntimeException("Sector no encontrado"));

//

        validarDisponibilidad(sector, reservaDTO.getCantidadEntradas());
        descontarDisponibles(sector, reservaDTO.getCantidadEntradas());

        Reserva reserva = crearReserva(reservaDTO, cliente, evento, sector);
        Reserva reservaGuardada = reservaRepository.save(reserva);

        return reservaMapper.meppearDTO(reservaGuardada);
    }


    // -> UTILIXAR BEAN VALIDATIONS

    private void validarDatosEntrada(ReservaDTO reservaDTO, Long clienteId){
        if(clienteId == null){throw new RuntimeException("El ID del cliente es obligatorio");}
        if(reservaDTO == null){throw new RuntimeException("La reserva no puede ser nula");}
        if(reservaDTO.getEventoId() == null){throw new RuntimeException("El ID del evento es obligatorio");}
        if(reservaDTO.getSectorId() == null){throw new RuntimeException("El ID del sector es obligatorio");}
        if(reservaDTO.getCantidadEntradas() <= 0){ throw new RuntimeException("Cantidad inválida");}
        if(reservaDTO.getCantidadEntradas() > MAXIMO_ENTRADAS){ throw new RuntimeException("Maximo permitido: " + MAXIMO_ENTRADAS + " entradas");} // -> considerar throw new ResponseStatusException(HttpStatus.BAD_REQUEST, )
    } 
   

    //metodo para validar entradas disponibles
    private void validarDisponibilidad(Sector sector,  int cantidad){
        if(sector.getDisponibles() < cantidad){
            throw new RuntimeException("No hay entradas disponibles");}
        }

    // metodo para descontar la cantidad de entradas disponibles.
    private void descontarDisponibles(Sector sector, int cantidad){
        sector.setDisponibles(sector.getDisponibles() - cantidad);
        sectorRepository.save(sector);
    }

    private Reserva crearReserva(ReservaDTO reservaDTO, Cliente cliente, Evento evento, Sector sector){
        LocalDateTime ahora = LocalDateTime.now();

        Reserva reserva = new Reserva();

        reserva.setCliente(cliente);
        reserva.setEvento(evento);
        reserva.setSector(sector);
        reserva.setCantidadEntradas(reservaDTO.getCantidadEntradas());
        reserva.setMontoTotal(reservaDTO.getMontoTotal());
        reserva.setEstado(EstadoReserva.PENDIENTE);
        reserva.setFechaCreacion(ahora);
        reserva.setFechaExpiracion(ahora.plusMinutes(MINUTOS_EXPIRACION));

        return reserva;
    }

    // confirmar
    @Override
    @Transactional
    public ReservaDTO confirmarReserva(Long reservaId){
        Reserva reserva = reservaRepository.findById(reservaId)
        .orElseThrow(() -> new RuntimeException("Reserva no encontrada."));

        // validacion de estado
        if(reserva.getEstado() != EstadoReserva.PENDIENTE){ throw new RuntimeException("La reseva esta expirada");}

        reserva.setEstado(EstadoReserva.PAGADA);

        Reserva reservaGuardada = reservaRepository.save(reserva);

        return reservaMapper.meppearDTO(reservaGuardada);
    }

    // cancelar
    @Override
    @Transactional
    public ReservaDTO cancelarReserva(Long reservaId){
        Reserva reserva = reservaRepository.findById(reservaId)
        .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

        // validar que no este espirada, cancelada o confirmada
        if(reserva.getEstado() != EstadoReserva.PENDIENTE){throw new RuntimeException("La reserva esta expirada");}

        reserva.setEstado(EstadoReserva.CANCELADA);

        //actualizamos la info del sector.
        Sector sector = reserva.getSector();
        sector.setDisponibles(sector.getDisponibles() + reserva.getCantidadEntradas());
        sectorRepository.save(sector);

        Reserva reservaGuardadaCancelada = reservaRepository.save(reserva);
        
        return reservaMapper.meppearDTO(reservaGuardadaCancelada);
    }
}