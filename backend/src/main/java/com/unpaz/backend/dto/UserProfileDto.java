package com.unpaz.backend.dto;

import com.unpaz.backend.model.Role;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDto {
    private String nombre;
    private String apellido;
    private String email;
    private Role role;
}