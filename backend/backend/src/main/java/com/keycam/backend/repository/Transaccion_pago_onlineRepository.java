package com.keycam.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keycam.backend.model.Transaccion_pago_onlineModel;

@Repository
public interface Transaccion_pago_onlineRepository extends JpaRepository<Transaccion_pago_onlineModel, Long> {
    
} 
