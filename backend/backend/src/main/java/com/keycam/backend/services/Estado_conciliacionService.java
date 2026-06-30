package com.keycam.backend.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.model.Estado_conciliacionModel;
import com.keycam.backend.repository.Estado_conciliacionRepository;

@Service
public class Estado_conciliacionService {
    @Autowired
    Estado_conciliacionRepository estado_conciliacionRepository;

    public ArrayList<Estado_conciliacionModel> listar() {
        return (ArrayList<Estado_conciliacionModel>) estado_conciliacionRepository.findAll();
    }
    
    public Estado_conciliacionModel nuevo(Estado_conciliacionModel estado_conciliacion) {
        return estado_conciliacionRepository.save(estado_conciliacion);
    }

    public Estado_conciliacionModel actualizar(Long id, Estado_conciliacionModel estado_conciliacion) {
        estado_conciliacion.setId(id);
        return estado_conciliacionRepository.save(estado_conciliacion);
    }

    public void eliminar(Long id) {
        estado_conciliacionRepository.deleteById(id);
    }
}
