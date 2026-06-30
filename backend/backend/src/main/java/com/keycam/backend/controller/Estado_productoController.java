package com.keycam.backend.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keycam.backend.model.Estado_productoModel;
import com.keycam.backend.services.Estado_productoService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/estado_productos")
public class Estado_productoController {
    
    @Autowired
    Estado_productoService estado_productoService;

    @CrossOrigin(origins = "http://localhost:4200")

    @GetMapping
    public ArrayList<Estado_productoModel> listarTodos(){
        return this.estado_productoService.listar();
    }

    @PostMapping
    public Estado_productoModel registrar(@RequestBody Estado_productoModel estado_producto){
        return this.estado_productoService.nuevo(estado_producto);
    }

    @PutMapping("/{id}")
    public Estado_productoModel actualizar(@PathVariable Long id, @RequestBody Estado_productoModel estado_producto) {
        return this.estado_productoService.actualizar(id, estado_producto);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        this.estado_productoService.eliminar(id);
    }  
}
