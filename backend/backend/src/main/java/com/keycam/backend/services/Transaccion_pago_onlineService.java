package com.keycam.backend.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.model.Transaccion_pago_onlineModel;
import com.keycam.backend.repository.Transaccion_pago_onlineRepository;

@Service
public class Transaccion_pago_onlineService {
    @Autowired
    Transaccion_pago_onlineRepository transaccion_pago_onlineRepository; 

    public ArrayList<Transaccion_pago_onlineModel> listar() {
        return (ArrayList<Transaccion_pago_onlineModel>) transaccion_pago_onlineRepository.findAll();
    }

    public Transaccion_pago_onlineModel nuevo(Transaccion_pago_onlineModel transaccion_pago_online) {
        return transaccion_pago_onlineRepository.save(transaccion_pago_online);
    }

    public Optional<Transaccion_pago_onlineModel> obtenerPorId(Long id) {
        return transaccion_pago_onlineRepository.findById(id);
    }

    public Transaccion_pago_onlineModel actualizar(Long id, Transaccion_pago_onlineModel transaccion_pago_online) {
        transaccion_pago_online.setId(id);
        return transaccion_pago_onlineRepository.save(transaccion_pago_online);
    }

    public void eliminar(Long id) {
        transaccion_pago_onlineRepository.deleteById(id);
    }
}
