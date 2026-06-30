package com.keycam.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keycam.backend.model.TelefonoModel;

import java.util.List;

@Repository
public interface TelefonoRepository extends JpaRepository<TelefonoModel, Long> {
    List<TelefonoModel> findByClienteId(Long idCliente);
}