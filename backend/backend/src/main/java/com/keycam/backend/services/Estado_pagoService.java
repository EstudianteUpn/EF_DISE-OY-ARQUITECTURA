package com.keycam.backend.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.model.Estado_pagoModel;
import com.keycam.backend.repository.Estado_pagoRepository;

@Service
public class Estado_pagoService {
    @Autowired
    Estado_pagoRepository estado_pagoRepository;

    public ArrayList<Estado_pagoModel> listar() {
        return (ArrayList<Estado_pagoModel>) estado_pagoRepository.findAll();
    }

    public Estado_pagoModel nuevo(Estado_pagoModel estado_pago) {
        return estado_pagoRepository.save(estado_pago);
    }

    public Estado_pagoModel actualizar(Long id, Estado_pagoModel estado_pago) {
        estado_pago.setId(id);
        return estado_pagoRepository.save(estado_pago);
    }

    public void eliminar(Long id) {
        estado_pagoRepository.deleteById(id);
    }
}
