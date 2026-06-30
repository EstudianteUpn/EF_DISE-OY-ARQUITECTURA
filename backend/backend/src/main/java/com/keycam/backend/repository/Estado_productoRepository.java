package com.keycam.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keycam.backend.model.Estado_productoModel;

@Repository
public interface Estado_productoRepository extends JpaRepository<Estado_productoModel, Long> {
    
}
