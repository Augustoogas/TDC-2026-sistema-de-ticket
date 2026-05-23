package com.unpaz.backend.controller;

import com.unpaz.backend.dto.ReservaDTO;
import com.unpaz.backend.model.Cliente;
import com.unpaz.backend.service.ClienteServiceImp;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
@Tag(name = "Clientes", description = "Endpoints para la gestión y consulta de clientes")
public class ClienteController {

    @Autowired
    private ClienteServiceImp clienteService;

    @Operation(
        summary = "Listar todos los clientes", 
        description = "Endpoint restringido. Solo los usuarios con rol ADMIN pueden ver la lista completa de clientes.",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponse(responseCode = "200", description = "Lista de clientes obtenida correctamente")
    @ApiResponse(responseCode = "403", description = "Acceso denegado - Se requiere rol ADMIN")
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Cliente>> getAllClientes() {
        return ResponseEntity.ok(clienteService.listarClientes());
    }


    @Operation(summary = "Listado de las reservas del cliente", description = 
    "Permite ver todas reservas que tiene un cliente")
    @ApiResponse(responseCode = "200", description = "Lista obtenida correctamente.")
    @ApiResponse(responseCode = "403", description = "no se sjjs")
    @GetMapping("/mis-reservas")
    @PreAuthorize("hasRole('CLIENTE')")
    public ResponseEntity<List<ReservaDTO>> misReservas(){
        String email = SecurityContextHolder
        .getContext()
        .getAuthentication()
        .getName();

        List<ReservaDTO> reservas = clienteService.obtenerReservasCliente(email);
        return ResponseEntity.ok(reservas);
    }
}