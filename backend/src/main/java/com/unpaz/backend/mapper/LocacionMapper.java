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

        List<SectorDTO> sectoresDTO = (locacion.getSectores() != null) 
            ? locacion.getSectores().stream()
                .map(s -> new SectorDTO(
                    s.getSectorId(), 
                    s.getNombre(), 
                    // Si capacidad, disponibles o precio son null en el objeto, mandamos 0 defensivo
                    s.getCapacidad() != null ? s.getCapacidad() : 0, 
                    s.getDisponibles() != null ? s.getDisponibles() : 0, 
                    s.getLocacion() != null ? s.getLocacion().getIdLocacion() : null,
                    s.getPrecio() != null ? s.getPrecio() : 0, // Aquí evitamos el NullPointerException del unboxing
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