package com.keycam.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keycam.backend.model.StockModel;

@Repository
public interface StockRepository extends JpaRepository<StockModel, Long> {
    StockModel findByProductoId(Long idProducto);
}
