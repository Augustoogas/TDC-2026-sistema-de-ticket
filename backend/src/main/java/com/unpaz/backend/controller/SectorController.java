package com.unpaz.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.unpaz.backend.dto.SectorDTO;
import com.unpaz.backend.service.SectorService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/sectores")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name = "Sectores", description = "Endpoints para la gestión de sectores en las locaciones")
public class SectorController {

    private final SectorService sectorService;

    @Operation(summary = "Listar todos los sectores (Solo ADMIN)")
    @ApiResponse(responseCode = "200", description = "Sectores listados correctamente")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<SectorDTO>> listarTodos() {
        return ResponseEntity.ok(sectorService.listarTodos());
    }

    @Operation(summary = "Crear un nuevo sector (Solo ADMIN)")
    @ApiResponse(responseCode = "201", description = "Sector creado correctamente")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<SectorDTO> crear(@Valid @RequestBody SectorDTO dto) {
        return new ResponseEntity<>(sectorService.crear(dto), HttpStatus.CREATED);
    }
}