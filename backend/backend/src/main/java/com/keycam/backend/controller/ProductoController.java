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

import com.keycam.backend.model.ProductoModel;
import com.keycam.backend.services.ProductoService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/productos")
public class ProductoController {

    @Autowired
    ProductoService productoService;

    @CrossOrigin(origins = "http://localhost:4200") //nuevo codigo luego del frontend

    @GetMapping
    public ArrayList<ProductoModel> listarTodos(){
        return this.productoService.listar();
    }

    @PostMapping
    public ProductoModel registrar(@RequestBody ProductoModel producto){
        return this.productoService.nuevo(producto);
    }

    @GetMapping("/{id}")
    public Optional<ProductoModel> obtenerPorId(@PathVariable Long id){
        return this.productoService.obtenerPorId(id);
    }

    @PutMapping("/{id}")
    public ProductoModel actualizar(@PathVariable Long id, @RequestBody ProductoModel producto){
        return this.productoService.actualizar(id, producto);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        this.productoService.eliminar(id);
    }
    
    
}