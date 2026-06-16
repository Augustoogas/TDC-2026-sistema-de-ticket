package com.unpaz.backend.dto;

import com.unpaz.backend.model.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Datos del perfil del usuario autenticado")
public class UserProfileDto {

    @Schema(description = "ID del usuario", example = "1")
    private Long id;

    @Schema(description = "Nombre del usuario", example = "Dani")
    private String nombre;

    @Schema(description = "Apellido del usuario", example = "Olmedo")
    private String apellido;

    @Schema(description = "Correo electrónico vinculado a la cuenta", example = "dani@unpaz.edu.ar")
    private String email;

    @Schema(description = "Rol jerárquico dentro del sistema", example = "CLIENTE")
    private Role role;
}