package com.unpaz.backend.controller;

import com.unpaz.backend.model.AuthResponse;
import com.unpaz.backend.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Importante para que el Front pueda conectarse
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody Map<String, String> request) {
        // 1. Autenticar las credenciales (Email y Password)
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.get("email"), 
                request.get("password")
            )
        );

        // 2. Si la autenticación fue exitosa, cargar el usuario
        final UserDetails user = userDetailsService.loadUserByUsername(request.get("email"));

        // 3. Generar el Token JWT
        final String token = jwtService.generateToken(user);

        // 4. Devolver el token envuelto en el objeto AuthResponse
        return ResponseEntity.ok(
            AuthResponse.builder()
                .token(token)
                .build()
        );
    }
}