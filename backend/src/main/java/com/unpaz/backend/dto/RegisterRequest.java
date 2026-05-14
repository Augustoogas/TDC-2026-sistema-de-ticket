package com.unpaz.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Objeto necesario para registrar un nuevo usuario en el sistema")
public class RegisterRequest {

    @Schema(description = "Nombre del usuario", example = "Daniel")
    private String nombre;

    @Schema(description = "Apellido del usuario", example = "Olmedo")
    private String apellido;

    @Schema(description = "Correo electrónico institucional o personal", example = "dani@unpaz.edu.ar")
    private String email;

    @Schema(description = "Contraseña de acceso (mínimo 8 caracteres sugerido)", example = "Password123!")
    private String password;

    @Schema(
        description = "Rol asignado al usuario. Si se envía vacío, el sistema asignará 'CLIENTE' por defecto.", 
        example = "CLIENTE",
        allowableValues = {"CLIENTE", "ADMIN"}
    )
    private String role; 
}