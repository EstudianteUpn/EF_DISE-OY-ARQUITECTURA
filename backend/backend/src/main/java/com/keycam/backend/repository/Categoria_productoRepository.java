package com.keycam.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keycam.backend.model.Categoria_productoModel;

@Repository
public interface Categoria_productoRepository extends JpaRepository<Categoria_productoModel, Long> {
    
}
