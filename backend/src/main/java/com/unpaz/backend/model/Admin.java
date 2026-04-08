package com.unpaz.backend.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Admin extends Usuario {
    // El admin podría estar asociado a los eventos que creó
    @OneToMany(mappedBy = "creador")
    private List<Evento> eventosCreados;
}