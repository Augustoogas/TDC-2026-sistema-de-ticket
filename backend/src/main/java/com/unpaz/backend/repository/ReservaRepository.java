package com.unpaz.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.unpaz.backend.model.Reserva;

public interface ReservaRepository  extends JpaRepository<Reserva, Long>{

}
