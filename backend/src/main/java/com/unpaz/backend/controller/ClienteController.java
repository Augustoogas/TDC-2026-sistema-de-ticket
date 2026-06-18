package com.unpaz.backend.controller;

import com.unpaz.backend.dto.ClienteDTO;
import com.unpaz.backend.mapper.ClienteMapper;
import com.unpaz.backend.repository.ClienteRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
@Tag(name = "Clientes", description = "Endpoints para la gestión y consulta de clientes utilizando DTOs")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ClienteMapper clienteMapper; // Inyectamos tu nuevo Mapper seguro

    @Operation(
        summary = "Listar todos los clientes (Solo ADMIN)", 
        description = "Endpoint restringido. Retorna la lista de clientes convertida a DTOs para cortar la recursividad y proteger datos sensibles.",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponse(responseCode = "200", description = "Lista de clientes (ClienteDTO) obtenida correctamente")
    @ApiResponse(responseCode = "403", description = "Acceso denegado - Se requiere rol ADMIN")
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ClienteDTO>> getAllClientes() {
        // Usamos el Stream para procesar la lista de entidades y transformarlas mediante el Mapper
        List<ClienteDTO> clientesDTO = clienteRepository.findAll().stream()
                .map(clienteMapper::toDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(clientesDTO);
    }

    @Operation(
        summary = "Eliminar un cliente por ID (Solo ADMIN)", 
        description = "Endpoint restringido. Elimina físicamente a un cliente de la base de datos usando su ID. Requiere token de ADMIN.",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponse(responseCode = "200", description = "Cliente eliminado correctamente")
    @ApiResponse(responseCode = "404", description = "Cliente no encontrado")
    @ApiResponse(responseCode = "403", description = "Acceso denegado - Se requiere rol ADMIN")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteCliente(@PathVariable Long id) {
        return clienteRepository.findById(id)
            .map(cliente -> {
                clienteRepository.delete(cliente);
                return ResponseEntity.ok().body("Cliente con ID " + id + " eliminado con éxito de la base de datos.");
            })
            .orElse(ResponseEntity.notFound().build());
    }
}