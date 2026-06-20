package com.unpaz.backend.mapper;

import org.springframework.stereotype.Component;

import com.unpaz.backend.dto.SectorDTO;
import com.unpaz.backend.model.Sector;

@Component
public class SectorMapper {

    public SectorDTO toDTO(Sector sector) {
        SectorDTO dto = new SectorDTO();

        dto.setSectorId(sector.getSectorId());
        dto.setNombre(sector.getNombre());
        dto.setCapacidad(sector.getCapacidad());
        dto.setDisponibles(sector.getDisponibles());
        dto.setPrecio(sector.getPrecio());
        dto.setColor(sector.getColor());
        if(sector.getLocacion() != null){
            dto.setLocacionId(sector.getLocacion().getIdLocacion());
        }

        return dto;
    }
}