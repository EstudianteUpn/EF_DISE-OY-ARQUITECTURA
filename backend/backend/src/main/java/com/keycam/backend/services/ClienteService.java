package com.keycam.backend.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.model.ClienteModel;
import com.keycam.backend.repository.ClienteRepository;

@Service
public class ClienteService {

    @Autowired
    ClienteRepository clienteRepository;

    public ArrayList<ClienteModel> listar() {
        return (ArrayList<ClienteModel>) clienteRepository.findAll();
    }

    public ClienteModel nuevo(ClienteModel cliente) {
        return clienteRepository.save(cliente);
    }

    public ClienteModel buscarPorId(Long id) {
        return clienteRepository.findById(id).orElse(null);
    }

    public ClienteModel actualizar(Long id, ClienteModel cliente) {
        cliente.setId(id);
        return clienteRepository.save(cliente);
    }

    public void eliminar(Long id) {
        clienteRepository.deleteById(id);
    }

    public ClienteModel buscarPorEmail(String email) {
        return clienteRepository.findByEmail(email);
    }
}