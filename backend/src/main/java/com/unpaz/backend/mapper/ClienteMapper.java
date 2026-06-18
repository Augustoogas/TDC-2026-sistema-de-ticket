package com.unpaz.backend.mapper;

import com.unpaz.backend.dto.ClienteDTO;
import com.unpaz.backend.model.Cliente;
import org.springframework.stereotype.Component;

@Component
public class ClienteMapper {

    public ClienteDTO toDTO(Cliente cliente) {
        if (cliente == null) return null;
        
        ClienteDTO dto = new ClienteDTO();
        dto.setUsuarioId(cliente.getUsuarioId());
        dto.setNombre(cliente.getNombre());       
        dto.setApellido(cliente.getApellido());   
        dto.setEmail(cliente.getEmail());         
        dto.setRole(cliente.getRole() != null ? cliente.getRole().name() : null); 
        
        return dto;
    }
}