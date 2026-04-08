package com.unpaz.backend.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Cliente extends Usuario {
    // Un cliente tiene muchas reservas
    @OneToMany(mappedBy = "cliente")
    private List<Reserva> reservas;
}