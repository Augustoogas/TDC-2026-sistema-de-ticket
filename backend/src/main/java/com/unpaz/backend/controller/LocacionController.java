package com.unpaz.backend.controller;

import com.unpaz.backend.dto.LocacionDTO;
import com.unpaz.backend.service.LocacionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locaciones")
@CrossOrigin(origins = "*")
@Tag(name = "Locaciones", description = "Endpoints para la gestión de locaciones de eventos")
@SecurityRequirement(name = "bearerAuth") // 🚀 Engancha TODO este controlador con el candado que ya te funciona
public class LocacionController {

    @Autowired
    private LocacionService locacionService;

    @Operation(summary = "Obtener todas las locaciones")
    @ApiResponse(responseCode = "200", description = "Lista obtenida correctamente")
    @GetMapping
    public ResponseEntity<List<LocacionDTO>> getAll() {
        return ResponseEntity.ok(locacionService.listarTodas());
    }

    @Operation(summary = "Obtener una locación por ID")
    @ApiResponse(responseCode = "200", description = "Locación encontrada")
    @ApiResponse(responseCode = "404", description = "Locación no encontrada")
    @GetMapping("/{id}")
    public ResponseEntity<LocacionDTO> getById(@PathVariable Long id) {
        return locacionService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Crear una nueva locación (Solo ADMIN)")
    @ApiResponse(responseCode = "201", description = "Locación creada con éxito")
    @ApiResponse(responseCode = "403", description = "Acceso denegado")
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LocacionDTO> create(@RequestBody LocacionDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(locacionService.guardar(dto));
    }

    @Operation(summary = "Actualizar una locación (Solo ADMIN)")
    @ApiResponse(responseCode = "200", description = "Locación actualizada con éxito")
    @ApiResponse(responseCode = "404", description = "Locación no encontrada")
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LocacionDTO> update(@PathVariable Long id, @RequestBody LocacionDTO dto) {
        return locacionService.actualizar(id, dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Eliminar una locación (Solo ADMIN)")
    @ApiResponse(responseCode = "200", description = "Locación eliminada correctamente")
    @ApiResponse(responseCode = "404", description = "Locación no encontrada")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (locacionService.eliminar(id)) {
            return ResponseEntity.ok().body("Locación eliminada con éxito.");
        }
        return ResponseEntity.notFound().build();
    }
}