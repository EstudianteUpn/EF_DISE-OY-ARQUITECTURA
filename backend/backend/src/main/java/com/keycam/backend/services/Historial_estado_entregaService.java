package com.keycam.backend.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.model.Historial_estado_entregaModel;
import com.keycam.backend.repository.Historial_estado_entregaRepository;

@Service
public class Historial_estado_entregaService {
    @Autowired
    Historial_estado_entregaRepository historial_estado_entregaRepository;

    public ArrayList<Historial_estado_entregaModel> listar() {
        return (ArrayList<Historial_estado_entregaModel>) historial_estado_entregaRepository.findAll();
    }

    public Historial_estado_entregaModel nuevo(Historial_estado_entregaModel historial_estado_entrega) {
        return historial_estado_entregaRepository.save(historial_estado_entrega);
    }

    public Optional<Historial_estado_entregaModel> obtenerPorId(Long id) {
        return historial_estado_entregaRepository.findById(id);
    }
}
