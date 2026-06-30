package com.keycam.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keycam.backend.model.EntregaModel;

@Repository
public interface EntregaRepository extends JpaRepository<EntregaModel, Long> {

    
} 
