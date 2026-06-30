package com.keycam.backend.controller;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keycam.backend.model.StockModel;
import com.keycam.backend.services.StockServices;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/stock")
public class StockController {
    
    @Autowired
    StockServices stockServices;

    @CrossOrigin(origins = "http://localhost:4200") 

    @GetMapping
    public ArrayList<StockModel> listarTodos(){
        return this.stockServices.listar();
    }

    @PostMapping
    public StockModel registrar(@RequestBody StockModel stock){
        return this.stockServices.nuevo(stock);
    }

    @GetMapping("/{id}")
    public Optional<StockModel> obtenerPorId(@PathVariable Long id){
        return this.stockServices.obtenerPorId(id);
    }

    @PutMapping("/{id}")
    public StockModel actualizar(@PathVariable Long id, @RequestBody StockModel stock){
        return this.stockServices.actualizar(id, stock);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        this.stockServices.eliminar(id);
    }
}
