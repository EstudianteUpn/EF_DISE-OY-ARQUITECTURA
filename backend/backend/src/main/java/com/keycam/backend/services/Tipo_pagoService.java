package com.keycam.backend.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.model.Tipo_pagoModel;
import com.keycam.backend.repository.Tipo_pagoRepository;

@Service
public class Tipo_pagoService {
    @Autowired
    Tipo_pagoRepository tipo_pagoRepository;

    public ArrayList<Tipo_pagoModel> listar() {
        return (ArrayList<Tipo_pagoModel>) tipo_pagoRepository.findAll();
    }

    public Tipo_pagoModel nuevo(Tipo_pagoModel tipo_pago) {
        return tipo_pagoRepository.save(tipo_pago);
    }

    public Tipo_pagoModel actualizar(Long id, Tipo_pagoModel tipo_pago) {
        tipo_pago.setId(id);
        return tipo_pagoRepository.save(tipo_pago);
    }

    public void eliminar(Long id) {
        tipo_pagoRepository.deleteById(id);
    }
}
