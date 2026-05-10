package com.unpaz.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.unpaz.backend.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	// metodo para buscar el usuario por email
    Optional<Usuario> findByEmail(String email);

}
