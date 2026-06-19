package com.unpaz.backend.repository;

import com.unpaz.backend.model.*;

import jakarta.persistence.LockModeType;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SectorRepository extends JpaRepository<Sector, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM Sector s where s.sectorId = :id")
    Optional<Sector> findByIdForUpdate(@Param("id") Long id);

    List<Sector> findByLocacionIdLocacion(Long idLocacion);
}
