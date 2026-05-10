package com.unpaz.backend.dto;


import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String nombre;
    private String apellido;
    private String email;
    private String password;
    private String role; // Por defecto se puede setear CLIENTE si viene vacío
}