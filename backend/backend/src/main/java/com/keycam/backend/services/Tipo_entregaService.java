package com.keycam.backend.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.model.Tipo_entregaModel;
import com.keycam.backend.repository.Tipo_entregaRepository;

@Service
public class Tipo_entregaService {
    @Autowired
    Tipo_entregaRepository tipo_entregaRepository;

    public ArrayList<Tipo_entregaModel> listar() {
        return (ArrayList<Tipo_entregaModel>) tipo_entregaRepository.findAll();
    }

    public Tipo_entregaModel nuevo(Tipo_entregaModel tipo_entrega) {
        return tipo_entregaRepository.save(tipo_entrega);
    }

    public Tipo_entregaModel actualizar(Long id, Tipo_entregaModel tipo_entrega) {
        tipo_entrega.setId(id);
        return tipo_entregaRepository.save(tipo_entrega);
    }

    public void eliminar(Long id) {
        tipo_entregaRepository.deleteById(id);
    }
}
