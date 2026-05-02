package com.unpaz.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unpaz.backend.model.Admin;

public interface AdminRepository extends JpaRepository <Admin, Long> {

}
