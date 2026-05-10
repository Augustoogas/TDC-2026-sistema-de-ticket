package com.unpaz.backend.controller;

import com.unpaz.backend.model.Admin;
import com.unpaz.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('ADMIN')") 
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    // Solo un ADMIN puede crear otro ADMIN
    @PostMapping
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
        Admin nuevoAdmin = adminRepository.save(admin);
        return new ResponseEntity<>(nuevoAdmin, HttpStatus.CREATED);
    }

    // Solo un ADMIN puede ver la lista de administradores
    @GetMapping
    public ResponseEntity<List<Admin>> getAllAdmin() {
        List<Admin> admins = adminRepository.findAll();
        return ResponseEntity.ok(admins);
    }
}