package com.keycam.backend.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.model.StockModel;
import com.keycam.backend.repository.StockRepository;

@Service
public class StockServices {
    @Autowired
    StockRepository stockRepository;

    public ArrayList<StockModel> listar() {
        return (ArrayList<StockModel>) stockRepository.findAll();
    }

    public StockModel nuevo(StockModel stock) {
        return stockRepository.save(stock);
    }

    public Optional<StockModel> obtenerPorId(Long id) {
        return stockRepository.findById(id);
    }

    public StockModel actualizar(Long id, StockModel stock) {
        stock.setId(id);
        return stockRepository.save(stock);
    }

    public void eliminar(Long id) {
        stockRepository.deleteById(id);
    }
}
