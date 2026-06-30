package com.keycam.backend.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.model.ProductoModel;
import com.keycam.backend.repository.ProductoRepository;

@Service
public class ProductoService {
    @Autowired
    ProductoRepository productoRepository;

    public ArrayList<ProductoModel> listar() {
        return (ArrayList<ProductoModel>) productoRepository.findAll();
    }

    public ProductoModel nuevo(ProductoModel producto) {
        return productoRepository.save(producto);
    }
    
    public Optional<ProductoModel> obtenerPorId(Long id) {
        return productoRepository.findById(id);
    }

    public ProductoModel actualizar(Long id, ProductoModel producto) {
        producto.setId(id);
        return productoRepository.save(producto);
    }

    public void eliminar(Long id) {
        productoRepository.deleteById(id);
    }
}
