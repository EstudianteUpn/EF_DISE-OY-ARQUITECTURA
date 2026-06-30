package com.keycam.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keycam.backend.model.Tipo_entregaModel;

@Repository
public interface Tipo_entregaRepository extends JpaRepository<Tipo_entregaModel, Long> {

    
} 
