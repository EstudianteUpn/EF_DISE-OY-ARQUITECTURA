package com.keycam.backend.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.model.Estado_entregaModel;
import com.keycam.backend.repository.Estado_entregaRepository;

@Service
public class Estado_entregaService {
    @Autowired
    Estado_entregaRepository estado_entregaRepository;

    public ArrayList<Estado_entregaModel> listar() {
        return (ArrayList<Estado_entregaModel>) estado_entregaRepository.findAll();
    }

    public Estado_entregaModel nuevo(Estado_entregaModel estado_entrega) {
        return estado_entregaRepository.save(estado_entrega);
    }

    public Estado_entregaModel actualizar(Long id, Estado_entregaModel estado_entrega) {
        estado_entrega.setId(id);
        return estado_entregaRepository.save(estado_entrega);
    }

    public void eliminar(Long id) {
        estado_entregaRepository.deleteById(id);
    }
}
