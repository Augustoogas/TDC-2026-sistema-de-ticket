package com.unpaz.backend.service;

import com.unpaz.backend.dto.LocacionDTO;
import com.unpaz.backend.mapper.LocacionMapper;
import com.unpaz.backend.model.Locacion;
import com.unpaz.backend.repository.LocacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LocacionService {

    @Autowired
    private LocacionRepository locacionRepository;

    @Autowired
    private LocacionMapper locacionMapper;

    public List<LocacionDTO> listarTodas() {
        return locacionRepository.findAll().stream()
                .map(locacionMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<LocacionDTO> buscarPorId(Long id) {
        return locacionRepository.findById(id).map(locacionMapper::toDTO);
    }

    public LocacionDTO guardar(LocacionDTO dto) {
        Locacion locacion = locacionMapper.toEntity(dto);
        Locacion guardada = locacionRepository.save(locacion);
        return locacionMapper.toDTO(guardada);
    }

    public Optional<LocacionDTO> actualizar(Long id, LocacionDTO dto) {
        return locacionRepository.findById(id).map(locacionExistente -> {
            locacionExistente.setNombre(dto.getNombre());
            locacionExistente.setDireccion(dto.getDireccion());
            locacionExistente.setCapacidad(dto.getCapacidad());
            locacionExistente.setAsientos(dto.getAsientos());
            return locacionMapper.toDTO(locacionRepository.save(locacionExistente));
        });
    }

    public boolean eliminar(Long id) {
        if (locacionRepository.existsById(id)) {
            locacionRepository.deleteById(id);
            return true;
        }
        return false;
    }
}