package com.keycam.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.model.TelefonoModel;
import com.keycam.backend.repository.TelefonoRepository;

@Service
public class TelefonoService {

    @Autowired
    TelefonoRepository telefonoRepository;

    public ArrayList<TelefonoModel> listar() {
        return (ArrayList<TelefonoModel>) telefonoRepository.findAll();
    }

    public List<TelefonoModel> listarPorCliente(Long idCliente) {
        return telefonoRepository.findByClienteId(idCliente);
    }

    public TelefonoModel nuevo(TelefonoModel telefono) {
        return telefonoRepository.save(telefono);
    }

    public Optional<TelefonoModel> obtenerPorId(Long id) {
        return telefonoRepository.findById(id);
    }

    public TelefonoModel actualizar(Long id, TelefonoModel telefono) {
        telefono.setId(id);
        return telefonoRepository.save(telefono);
    }

    public void eliminar(Long id) {
        telefonoRepository.deleteById(id);
    }
    
}