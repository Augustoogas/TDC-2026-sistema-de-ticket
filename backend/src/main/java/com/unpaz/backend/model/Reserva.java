package com.unpaz.backend.model;

import java.time.LocalDateTime;
import jakarta.persistence.Id;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@Entity
// @Data // o en todo caso, usar getters y setters
@NoArgsConstructor
@AllArgsConstructor
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long usuarioId;
    private Long eventoId;
    // agregar una lista de los asientos
    private Double montoTotal; // para el req 13; considerar interfaz
    @Enumerated(EnumType.STRING)
    private EstadoReserva estado; // para tener un estaod de la reserva
    // opcional -> hacer una clase EstadoReserva - sobrecarga?
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaExpiracion; // en el service de la reserva se configura el limite de 15 min.


     // enum

    public enum EstadoReserva {
        PENDEINTE,
        PAGADA,
        CANCELADA,
        EXPIRADA
    }

    // SETTERS Y GETTERS
    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public Long getUsuarioId() {
        return usuarioId;
    }


    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }


    public Long getEventoId() {
        return eventoId;
    }


    public void setEventoId(Long eventoId) {
        this.eventoId = eventoId;
    }


    public Double getMontoTotal() {
        return montoTotal;
    }


    public void setMontoTotal(Double montoTotal) {
        this.montoTotal = montoTotal;
    }


    public EstadoReserva getEstado() {
        return estado;
    }


    public void setEstado(EstadoReserva estado) {
        this.estado = estado;
    }


    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }


    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }


    public LocalDateTime getFechaExpiracion() {
        return fechaExpiracion;
    }


    public void setFechaExpiracion(LocalDateTime fechaExpiracion) {
        this.fechaExpiracion = fechaExpiracion;
    }
}
