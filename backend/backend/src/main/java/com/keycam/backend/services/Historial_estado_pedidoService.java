package com.keycam.backend.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.model.Historial_estado_pedidoModel;
import com.keycam.backend.repository.Historial_estado_pedidoRepository;

@Service
public class Historial_estado_pedidoService {
    @Autowired
    Historial_estado_pedidoRepository historial_estado_pedidoRepository;

    public ArrayList<Historial_estado_pedidoModel> listar() {
        return (ArrayList<Historial_estado_pedidoModel>) historial_estado_pedidoRepository.findAll();
    }

    public Historial_estado_pedidoModel nuevo(Historial_estado_pedidoModel historial_estado_pedido) {
        return historial_estado_pedidoRepository.save(historial_estado_pedido);
    }

    public Optional<Historial_estado_pedidoModel> obtenerPorId(Long id) {
        return historial_estado_pedidoRepository.findById(id);
    }
}
