package com.keycam.backend.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keycam.backend.model.Categoria_productoModel;
import com.keycam.backend.services.Categoria_productoService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/categoria_productos")
public class Categoria_productoController {
    
    @Autowired
    Categoria_productoService categoria_productoService;

    @CrossOrigin(origins = "http://localhost:4200")

    @GetMapping
    public ArrayList<Categoria_productoModel> listarTodos(){
        return this.categoria_productoService.listar();
    }

    @PostMapping
    public Categoria_productoModel registrar(@RequestBody Categoria_productoModel categoria_producto){
        return this.categoria_productoService.nuevo(categoria_producto);
    }

    @PutMapping("/{id}")
    public Categoria_productoModel actualizar(@PathVariable Long id, @RequestBody Categoria_productoModel categoria_producto) {
        return this.categoria_productoService.actualizar(id, categoria_producto);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        this.categoria_productoService.eliminar(id);
    }
}
