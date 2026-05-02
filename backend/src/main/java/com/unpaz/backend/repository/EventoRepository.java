package com.unpaz.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.unpaz.backend.model.Evento;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {

    
    List<Evento> findByTituloContainingOrTipoContaining(String titulo, String tipo);
}