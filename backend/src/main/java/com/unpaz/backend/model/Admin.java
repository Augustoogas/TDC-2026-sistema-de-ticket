package com.unpaz.backend.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Data
//@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class Admin extends Usuario {
    // El admin podría estar asociado a los eventos que creó
    @OneToMany(mappedBy = "creador")
    private List<Evento> eventosCreados;
}