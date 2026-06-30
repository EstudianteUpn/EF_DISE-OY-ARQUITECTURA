package com.keycam.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keycam.backend.model.Estado_pagoModel;

@Repository
public interface Estado_pagoRepository extends JpaRepository<Estado_pagoModel, Long> {

    
}