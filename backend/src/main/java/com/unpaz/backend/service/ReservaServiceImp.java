package com.unpaz.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.unpaz.backend.dto.ReservaDTO;
import com.unpaz.backend.repository.EventoRepository;
import com.unpaz.backend.repository.ReservaRepository;
import com.unpaz.backend.repository.SectorRepository;
import com.unpaz.backend.repository.UsuarioRepository;
import com.unpaz.backend.model.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor
public class ReservaServiceImp implements IReservaService {

    private final ReservaRepository reservaRepo;
    private final EventoRepository eventoRepo;
    private final UsuarioRepository userRepo;
    private final SectorRepository sectorRepo;

    private final static int MINUTOS_EXPIRACION = 15;
    private final static int MAXIMO_ENTRADAS = 10;

    @Override
    public List<ReservaDTO> listarTodas() {
        
        List<Reserva> reservas = reservaRepo.findAll();
        
        return reservas.stream()
                       .map(this::mapearDTO)
                       .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ReservaDTO crearReservaTemporal( ReservaDTO reservaDTO, Long clienteId) {

        validarDatosEntrada(reservaDTO, clienteId);

        Usuario usuario = userRepo.findById(clienteId)
            .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        if(!(usuario instanceof Cliente cliente)){
            throw new RuntimeException("El usuario no es un cliente válido");}

        Evento evento = eventoRepo.findById(reservaDTO.getEventoId())
            .orElseThrow(() -> new RuntimeException("Evento no encontrado"));
        Sector sector = sectorRepo.findById(reservaDTO.getSectorId())
            .orElseThrow(() ->new RuntimeException("Sector no encontrado"));

//

        validarDisponibilidad(sector, reservaDTO.getCantidadEntradas());
        descontarDisponibles(sector, reservaDTO.getCantidadEntradas());

        Reserva reserva = crearReserva(reservaDTO, cliente, evento, sector);
        Reserva reservaGuardada = reservaRepo.save(reserva);

        return mapearDTO(reservaGuardada);
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
        sectorRepo.save(sector);
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
        Reserva reserva = reservaRepo.findById(reservaId)
        .orElseThrow(() -> new RuntimeException("Reserva no encontrada."));

        // validacion de estado
        if(reserva.getEstado() != EstadoReserva.PENDIENTE){ throw new RuntimeException("La reseva esta expirada");}

        reserva.setEstado(EstadoReserva.PAGADA);

        Reserva reservaGuardada = reservaRepo.save(reserva);

        return mapearDTO(reservaGuardada);
    }

    // cancelar
    @Override
    @Transactional
    public ReservaDTO cancelarReserva(Long reservaId){
        Reserva reserva = reservaRepo.findById(reservaId)
        .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

        // validar que no este espirada, cancelada o confirmada
        if(reserva.getEstado() != EstadoReserva.PENDIENTE){throw new RuntimeException("La reserva esta expirada");}

        reserva.setEstado(EstadoReserva.CANCELADA);

        //actualizamos la info del sector.
        Sector sector = reserva.getSector();
        sector.setDisponibles(sector.getDisponibles() + reserva.getCantidadEntradas());
        sectorRepo.save(sector);

        Reserva reservaGuardadaCancelada = reservaRepo.save(reserva);
        
        return mapearDTO(reservaGuardadaCancelada);
    }


    // crear un paquete aparte para el mapper
    private ReservaDTO mapearDTO(
            Reserva reserva
    ){

        ReservaDTO dto = new ReservaDTO();
        dto.setReservaId(reserva.getId());
        dto.setEventoId(reserva.getEvento().getEventoId());
        dto.setNombreEvento(reserva.getEvento().getTitulo());
        dto.setMontoTotal(reserva.getMontoTotal());
        dto.setEstado(reserva.getEstado());
        dto.setFechaExpiracion(reserva.getFechaExpiracion());
        dto.setSectorId(reserva.getSector().getSectorId());
        dto.setCantidadEntradas(reserva.getCantidadEntradas());
        dto.setNombreSector(reserva.getSector().getNombre());

        return dto;
    }
}