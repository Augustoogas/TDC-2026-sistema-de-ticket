package com.unpaz.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.unpaz.backend.mapper.SectorMapper;
import com.unpaz.backend.repository.LocacionRepository;
import com.unpaz.backend.repository.SectorRepository;

import com.unpaz.backend.dto.SectorDTO;
import com.unpaz.backend.model.Sector;
import com.unpaz.backend.model.Locacion;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SectorService {

    private final SectorRepository sectorRepository;
    private final LocacionRepository locacionRepository;
    private final SectorMapper sectorMapper;

    public List<SectorDTO> listarTodos() {
        return sectorRepository.findAll()
                .stream()
                .map(sectorMapper::toDTO)
                .toList();
    }

    public SectorDTO crear(SectorDTO dto) {

        Locacion locacion = locacionRepository
                .findById(dto.getLocacionId())
                .orElseThrow(() -> new RuntimeException("Locación no encontrada"));

        Sector sector = new Sector();

        sector.setNombre(dto.getNombre());
        sector.setCapacidad(dto.getCapacidad());
        sector.setDisponibles(dto.getCapacidad());
        sector.setLocacion(locacion);

        return sectorMapper.toDTO(
                sectorRepository.save(sector)
        );
    }
}