package com.unpaz.backend.controller;

import com.unpaz.backend.model.Admin;
import com.unpaz.backend.repository.AdminRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('ADMIN')") 
@Tag(name = "Administración", description = "Endpoints restringidos para la gestión de administradores")
@SecurityRequirement(name = "bearerAuth") // Aplica el candado a todos los métodos del controller
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @Operation(
        summary = "Crear un nuevo administrador", 
        description = "Endpoint restringido. Permite que un administrador existente registre a otro."
    )
    @ApiResponse(responseCode = "201", description = "Admin creado con éxito")
    @ApiResponse(responseCode = "403", description = "Acceso denegado - Se requiere rol ADMIN")
    @PostMapping
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
        Admin nuevoAdmin = adminRepository.save(admin);
        return new ResponseEntity<>(nuevoAdmin, HttpStatus.CREATED);
    }

    @Operation(
        summary = "Listar todos los administradores", 
        description = "Retorna la lista completa de usuarios con privilegios de administrador."
    )
    @ApiResponse(responseCode = "200", description = "Lista obtenida correctamente")
    @ApiResponse(responseCode = "403", description = "Acceso denegado")
    @GetMapping
    public ResponseEntity<List<Admin>> getAllAdmin() {
        List<Admin> admins = adminRepository.findAll();
        return ResponseEntity.ok(admins);
    }
}