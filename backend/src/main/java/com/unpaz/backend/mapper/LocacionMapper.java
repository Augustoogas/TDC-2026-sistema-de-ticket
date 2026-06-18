package com.unpaz.backend.mapper;

import com.unpaz.backend.dto.LocacionDTO;
import com.unpaz.backend.model.Locacion;
import org.springframework.stereotype.Component;

@Component
public class LocacionMapper {

    public LocacionDTO toDTO(Locacion locacion) {
        if (locacion == null) return null;
        return new LocacionDTO(
            locacion.getIdLocacion(),
            locacion.getNombre(),
            locacion.getDireccion(),
            locacion.getCapacidad(),
            locacion.getAsientos()
        );
    }

    public Locacion toEntity(LocacionDTO dto) {
        if (dto == null) return null;
        return new Locacion(
            dto.getIdLocacion(),
            dto.getNombre(),
            dto.getDireccion(),
            dto.getCapacidad(),
            dto.getAsientos()
        );
    }
}