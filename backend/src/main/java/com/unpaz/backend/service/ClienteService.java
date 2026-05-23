package com.unpaz.backend.service;

import java.util.List;

import com.unpaz.backend.dto.ReservaDTO;
import com.unpaz.backend.model.Cliente;

public interface ClienteService {
    List<Cliente> listarClientes();
    List<ReservaDTO> obtenerReservasCliente(String email);
}
