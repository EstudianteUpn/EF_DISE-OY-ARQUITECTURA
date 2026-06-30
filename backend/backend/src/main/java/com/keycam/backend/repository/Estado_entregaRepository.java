package com.keycam.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keycam.backend.model.Estado_entregaModel;

@Repository
public interface Estado_entregaRepository extends JpaRepository<Estado_entregaModel, Long> {

    
}
