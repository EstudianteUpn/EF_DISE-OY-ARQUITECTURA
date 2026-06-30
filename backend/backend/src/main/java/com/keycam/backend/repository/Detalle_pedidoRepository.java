package com.keycam.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keycam.backend.model.Detalle_pedidoModel;

@Repository
public interface Detalle_pedidoRepository extends JpaRepository<Detalle_pedidoModel, Long> {
    List<Detalle_pedidoModel> findByPedidoId(Long pedidoId); // ← agregar    
}
