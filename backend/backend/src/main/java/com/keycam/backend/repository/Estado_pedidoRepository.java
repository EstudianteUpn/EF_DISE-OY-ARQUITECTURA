package com.keycam.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keycam.backend.model.Estado_pedidoModel;

@Repository
public interface Estado_pedidoRepository extends JpaRepository<Estado_pedidoModel, Long> {

    
} 
