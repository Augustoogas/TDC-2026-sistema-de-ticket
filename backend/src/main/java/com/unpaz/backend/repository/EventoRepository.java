package com.unpaz.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.unpaz.backend.model.Evento;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {

    // query que buscar por titulo, tipo, locacion
    List<Evento> findByTituloContainingIgnoreCaseOrTipoContainingIgnoreCaseOrLocacionNombreContainingIgnoreCase(String titulo, String tipo, String locacion);
}