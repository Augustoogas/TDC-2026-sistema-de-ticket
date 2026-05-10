package com.unpaz.backend.controller;
import com.unpaz.backend.model.Role;
import com.unpaz.backend.model.AuthResponse;
import com.unpaz.backend.dto.RegisterRequest; 
import com.unpaz.backend.model.Usuario;
import com.unpaz.backend.repository.UsuarioRepository;
import com.unpaz.backend.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    
    private final PasswordEncoder passwordEncoder;
    private final UsuarioRepository usuarioRepository;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        // 1. Creamos el usuario encriptando la contraseña
        Usuario user = Usuario.builder()
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole() != null ? Role.valueOf(request.getRole().toUpperCase()) : Role.CLIENTE)
                .build();

        // 2. Guardamos en la DB
        usuarioRepository.save(user);

        // 3. Generamos token para que entre directo
        final String token = jwtService.generateToken(user);

        return ResponseEntity.ok(
            AuthResponse.builder()
                .token(token)
                .build()
        );
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody Map<String, String> request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.get("email"), 
                request.get("password")
            )
        );

        final UserDetails user = userDetailsService.loadUserByUsername(request.get("email"));
        final String token = jwtService.generateToken(user);

        return ResponseEntity.ok(
            AuthResponse.builder()
                .token(token)
                .build()
        );
    }
}