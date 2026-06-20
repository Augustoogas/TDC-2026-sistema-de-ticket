package com.unpaz.backend.mapper;

import org.springframework.stereotype.Component;
import com.unpaz.backend.dto.SectorDTO;
import com.unpaz.backend.model.Sector;

@Component
public class SectorMapper {

    public SectorDTO toDTO(Sector sector) {
        if (sector == null) return null;
        
        SectorDTO dto = new SectorDTO();

        dto.setSectorId(sector.getSectorId());
        dto.setNombre(sector.getNombre());
        
        // Control de nulos con ternarios para evitar NullPointerException al pasar a Integer
        dto.setCapacidad(sector.getCapacidad() != null ? sector.getCapacidad() : 0);
        dto.setDisponibles(sector.getDisponibles() != null ? sector.getDisponibles() : 0);
        dto.setPrecio(sector.getPrecio() != null ? sector.getPrecio() : 0);
        
        dto.setColor(sector.getColor());
        
        if(sector.getLocacion() != null){
            dto.setLocacionId(sector.getLocacion().getIdLocacion());
        }

        return dto;
    }
}