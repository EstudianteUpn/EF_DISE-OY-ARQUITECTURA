package com.keycam.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keycam.backend.model.Tipo_pagoModel;

@Repository
public interface Tipo_pagoRepository extends JpaRepository<Tipo_pagoModel, Long> {

    
}