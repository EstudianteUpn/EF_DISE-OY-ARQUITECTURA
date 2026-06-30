package com.keycam.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.model.Direccion_clienteModel;
import com.keycam.backend.repository.Direccion_clienteRepository;

@Service
public class Direccion_clienteService {

    @Autowired
    Direccion_clienteRepository direccion_clienteRepository;

    public ArrayList<Direccion_clienteModel> listar() {
        return (ArrayList<Direccion_clienteModel>) direccion_clienteRepository.findAll();
    }

    public List<Direccion_clienteModel> listarPorCliente(Long idCliente) {
        return direccion_clienteRepository.findByClienteId(idCliente);
    }

    public Direccion_clienteModel nuevo(Direccion_clienteModel direccion) {
        return direccion_clienteRepository.save(direccion);
    }

    public Optional<Direccion_clienteModel> obtenerPorId(Long id) {
        return direccion_clienteRepository.findById(id);
    }

    public Direccion_clienteModel actualizar(Long id, Direccion_clienteModel direccion) {
        direccion.setId(id);
        return direccion_clienteRepository.save(direccion);
    }

    public void eliminar(Long id) {
        direccion_clienteRepository.deleteById(id);
    }
}