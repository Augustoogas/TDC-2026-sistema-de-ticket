package com.unpaz.backend.controller;

import com.unpaz.backend.model.Role;
import com.unpaz.backend.model.Admin;
import com.unpaz.backend.model.AuthResponse;
import com.unpaz.backend.model.Cliente;
import com.unpaz.backend.dto.RegisterRequest;
import com.unpaz.backend.dto.UserProfileDto;
import com.unpaz.backend.model.Usuario;
import com.unpaz.backend.repository.UsuarioRepository;
import com.unpaz.backend.service.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
@Tag(name = "Autenticación", description = "Endpoints para registro, login y gestión de perfil")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final UsuarioRepository usuarioRepository;


    // Solo registra en usuarios -> clientes
    @Operation(summary = "Registrar nuevo usuario", description = "Crea un usuario en la base de datos y retorna un token JWT")
    @ApiResponse(responseCode = "201", description = "Usuario registrado con éxito")
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        Cliente cliente = Cliente.builder()
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.CLIENTE)
                .build();

        usuarioRepository.save(cliente);
        final String token = jwtService.generateToken(cliente);
        return ResponseEntity.ok(AuthResponse.builder().token(token).build());
    }
    
    // ResponseEntity.status(HttpStatus.CREATED).body()

    
    // Solo registra en usuarios -> admins
    @Operation(summary = "Registrar nuevo administrador", description = "Endpoint protegido. Solo un ADMIN puede registrar a otro ADMIN.")
    @PostMapping("/register-admin")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<AuthResponse> registerAdmin(@RequestBody RegisterRequest request) {
        Admin admin = Admin.builder()
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ADMIN)
                .build();

        usuarioRepository.save(admin);
        final String token = jwtService.generateToken(admin);
        return ResponseEntity.ok(AuthResponse.builder().token(token).build());
    }

//

    @Operation(
        summary = "Obtener perfil del usuario actual", 
        description = "Requiere token JWT. Retorna los datos del usuario autenticado.",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponse(responseCode = "200", description = "Perfil obtenido correctamente")
    @ApiResponse(responseCode = "403", description = "Token no válido o ausente")
    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getMyProfile() {
        Object principal = org.springframework.security.core.context.SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();

        String email = (principal instanceof UserDetails) ? ((UserDetails) principal).getUsername() : principal.toString();

        Usuario usuarioLogueado = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        UserProfileDto perfil = UserProfileDto.builder()
                .nombre(usuarioLogueado.getNombre())
                .apellido(usuarioLogueado.getApellido())
                .email(usuarioLogueado.getEmail())
                .role(usuarioLogueado.getRole())
                .build();

        return ResponseEntity.ok(perfil);
    }

    @Operation(summary = "Iniciar sesión", description = "Autentica credenciales y devuelve el token JWT")
    @ApiResponse(responseCode = "200", description = "Login exitoso")
    @ApiResponse(responseCode = "401", description = "Credenciales inválidas")
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody Map<String, String> request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.get("email"), request.get("password"))
        );

        final UserDetails user = userDetailsService.loadUserByUsername(request.get("email"));
        final String token = jwtService.generateToken(user);

        return ResponseEntity.ok(AuthResponse.builder().token(token).build());
    }
}