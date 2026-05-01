package com.unpaz.backend.controller;

import com.unpaz.backend.dto.ReservaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.unpaz.backend.service.IReservaService;


@RestController
@RequestMapping("api/reserva")
@CrossOrigin(origins = "*")
public class ReservaController {

    @Autowired
    private IReservaService reservaservice;

    @PostMapping("/{clienteId}")
    public ResponseEntity<ReservaDTO> crear(@RequestBody ReservaDTO dto, @PathVariable Long clienteId) {
        ReservaDTO respuesta = reservaservice.crearReservaTemporal(dto, clienteId);
        return ResponseEntity.ok(respuesta);
    }
}
