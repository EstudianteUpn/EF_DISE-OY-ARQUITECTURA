package com.keycam.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keycam.backend.model.Estado_usuarioModel;

@Repository
public interface Estado_usuarioRepository extends JpaRepository<Estado_usuarioModel, Long> {
    Optional<Estado_usuarioModel> findByNombre(String nombre);
}