package com.keycam.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keycam.backend.model.Conciliacion_pagoModel;

@Repository
public interface Conciliacion_pagoRepository extends JpaRepository<Conciliacion_pagoModel, Long> {

    
}