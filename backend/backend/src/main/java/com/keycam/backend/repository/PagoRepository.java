package com.keycam.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keycam.backend.model.PagoModel;


@Repository
public interface PagoRepository extends JpaRepository<PagoModel, Long> {
    // PagoRepository.java
    Optional<PagoModel> findByPedido_Id(Long idPedido);    
} 