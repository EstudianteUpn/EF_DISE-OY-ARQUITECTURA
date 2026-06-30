package com.keycam.backend.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.model.PagoModel;
import com.keycam.backend.repository.PagoRepository;

@Service
public class PagoService {
    @Autowired
    PagoRepository pagoRepository;

    public ArrayList<PagoModel> listar() {
        return (ArrayList<PagoModel>) pagoRepository.findAll();
    }

    public PagoModel nuevo(PagoModel pago) {
        return pagoRepository.save(pago);
    }

    public Optional<PagoModel> obtenerPorId(Long id) {
        return pagoRepository.findById(id);
    }

    public PagoModel actualizar(Long id, PagoModel pago) {
        pago.setId(id);
        return pagoRepository.save(pago);
    }

    public void eliminar(Long id) {
        pagoRepository.deleteById(id);
    }
}
