package com.unpaz.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.unpaz.backend.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}
