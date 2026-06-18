package com.unpaz.backend.controller;

import com.unpaz.backend.model.Cliente;
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
@Tag(name = "Clientes", description = "Endpoints para la gestión y consulta de clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @Operation(
        summary = "Listar todos los clientes", 
        description = "Endpoint restringido. Retorna los datos planos de los clientes limpios de recursividad.",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponse(responseCode = "200", description = "Lista de clientes obtenida correctamente")
    @ApiResponse(responseCode = "403", description = "Acceso denegado - Se requiere rol ADMIN")
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllClientes() {
        // Mapeamos a un mapa plano para cortar CUALQUIER recursividad y ocultar passwords
        List<?> clientesLimpios = clienteRepository.findAll().stream().map(cliente -> {
            return java.util.Map.of(
                "usuarioId", cliente.getUsuarioId(),
                "nombre", cliente.getNombre(),
                "apellido", cliente.getApellido(),
                "email", cliente.getEmail(),
                "role", cliente.getRole()
            );
        }).collect(Collectors.toList());

        return ResponseEntity.ok(clientesLimpios);
    }

    @Operation(
        summary = "Eliminar un cliente por ID", 
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
                return ResponseEntity.ok().body("Cliente con ID " + id + " eliminado con éxito.");
            })
            .orElse(ResponseEntity.notFound().build());
    }
}