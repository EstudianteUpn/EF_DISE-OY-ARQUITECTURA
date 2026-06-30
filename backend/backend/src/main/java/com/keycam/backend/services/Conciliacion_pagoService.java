package com.keycam.backend.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.model.Conciliacion_pagoModel;
import com.keycam.backend.repository.Conciliacion_pagoRepository;

@Service
public class Conciliacion_pagoService {
    @Autowired
    Conciliacion_pagoRepository conciliacion_pagoRepository;

    public ArrayList<Conciliacion_pagoModel> listar() {
        return (ArrayList<Conciliacion_pagoModel>) conciliacion_pagoRepository.findAll();
    }

    public Conciliacion_pagoModel nuevo(Conciliacion_pagoModel conciliacion_pago) {
        return conciliacion_pagoRepository.save(conciliacion_pago);
    }

    public Optional<Conciliacion_pagoModel> obtenerPorId(Long id) {
        return conciliacion_pagoRepository.findById(id);
    }
}
