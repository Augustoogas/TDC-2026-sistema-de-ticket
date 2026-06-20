package com.unpaz.backend.mapper;

import com.unpaz.backend.dto.LocacionDTO;
import com.unpaz.backend.dto.SectorDTO;
import com.unpaz.backend.model.Locacion;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class LocacionMapper {

    public LocacionDTO toDTO(Locacion locacion) {
        if (locacion == null) return null;

        // tuve que agregar esto para evitar el nullexception
        List<SectorDTO> sectoresDTO = (locacion.getSectores() != null) 
            ? locacion.getSectores().stream()
                .map(s -> new SectorDTO(
                    s.getSectorId(), 
                    s.getNombre(), 
                    s.getCapacidad(), 
                    s.getDisponibles(), 
                    s.getLocacion() != null ? s.getLocacion().getIdLocacion() : null,
                    s.getPrecio(),
                    s.getColor()
                ))
                .toList()
            : new ArrayList<>();

        return new LocacionDTO(
            locacion.getIdLocacion(),
            locacion.getNombre(),
            locacion.getDireccion(),
            locacion.getCapacidad(),
            locacion.getAsientos(),
            sectoresDTO
        );
    }

    public Locacion toEntity(LocacionDTO dto) {
        if (dto == null) return null;

        Locacion locacion = new Locacion();
        locacion.setIdLocacion(dto.getIdLocacion());
        locacion.setNombre(dto.getNombre());
        locacion.setDireccion(dto.getDireccion());
        locacion.setCapacidad(dto.getCapacidad());
        locacion.setAsientos(dto.getAsientos());
        locacion.setSectores(new ArrayList<>()); 

        return locacion;
    }
}