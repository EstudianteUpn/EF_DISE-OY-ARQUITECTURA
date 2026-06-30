package com.keycam.backend.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.model.Estado_productoModel;
import com.keycam.backend.repository.Estado_productoRepository;

@Service
public class Estado_productoService {
    @Autowired
    Estado_productoRepository estado_productoRepository;

    public ArrayList<Estado_productoModel> listar() {
        return (ArrayList<Estado_productoModel>) estado_productoRepository.findAll();
    }

    public Estado_productoModel nuevo(Estado_productoModel estado_producto) {
        return estado_productoRepository.save(estado_producto);
    }

    public Estado_productoModel actualizar(Long id, Estado_productoModel estado_producto) {
        estado_producto.setId(id);
        return estado_productoRepository.save(estado_producto);
    }

    public void eliminar(Long id) {
        estado_productoRepository.deleteById(id);
    }
}
