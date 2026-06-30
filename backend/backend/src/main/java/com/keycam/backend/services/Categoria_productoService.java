package com.keycam.backend.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.model.Categoria_productoModel;
import com.keycam.backend.repository.Categoria_productoRepository;

@Service
public class Categoria_productoService {
    @Autowired
    Categoria_productoRepository categoria_productoRepository;

    public ArrayList<Categoria_productoModel> listar() {
        return (ArrayList<Categoria_productoModel>) categoria_productoRepository.findAll();
    }

    public Categoria_productoModel nuevo(Categoria_productoModel categoria_producto) {
        return categoria_productoRepository.save(categoria_producto);
    }

    public Categoria_productoModel actualizar(Long id, Categoria_productoModel categoria_producto) {
        categoria_producto.setId(id);
        return categoria_productoRepository.save(categoria_producto);
    }

    public void eliminar(Long id) {
        categoria_productoRepository.deleteById(id);
    }
}
