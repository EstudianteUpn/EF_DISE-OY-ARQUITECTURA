package com.keycam.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keycam.backend.model.Historial_estado_pedidoModel;

@Repository
public interface Historial_estado_pedidoRepository extends JpaRepository<Historial_estado_pedidoModel, Long> {

    
} 
