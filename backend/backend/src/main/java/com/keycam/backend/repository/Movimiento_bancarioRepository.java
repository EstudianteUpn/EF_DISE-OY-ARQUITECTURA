package com.keycam.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keycam.backend.model.Movimiento_bancarioModel;

@Repository
public interface Movimiento_bancarioRepository extends JpaRepository<Movimiento_bancarioModel, Long> {

    
} 
