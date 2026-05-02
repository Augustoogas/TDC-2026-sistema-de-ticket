package com.unpaz.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unpaz.backend.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long>{

}
