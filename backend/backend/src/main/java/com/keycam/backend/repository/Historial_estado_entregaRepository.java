package com.keycam.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keycam.backend.model.Historial_estado_entregaModel;

@Repository
public interface Historial_estado_entregaRepository extends JpaRepository<Historial_estado_entregaModel, Long> {

    
}
