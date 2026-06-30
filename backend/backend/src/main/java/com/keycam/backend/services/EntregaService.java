package com.keycam.backend.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.model.EntregaModel;
import com.keycam.backend.repository.EntregaRepository;

@Service
public class EntregaService {
    @Autowired
    EntregaRepository entregaRepository;

    public ArrayList<EntregaModel> listar() {
        return (ArrayList<EntregaModel>) entregaRepository.findAll();
    }

    public EntregaModel nuevo(EntregaModel entrega) {
        return entregaRepository.save(entrega);
    }

    public Optional<EntregaModel> obtenerPorId(Long id) {
        return entregaRepository.findById(id);
    }

    public EntregaModel actualizar(Long id, EntregaModel entrega) {
        entrega.setId(id);
        return entregaRepository.save(entrega);
    }

    public void eliminar(Long id) {
        entregaRepository.deleteById(id);
    }
}
