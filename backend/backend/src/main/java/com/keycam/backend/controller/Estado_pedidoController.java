package com.keycam.backend.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keycam.backend.model.Estado_pedidoModel;
import com.keycam.backend.services.Estado_pedidoService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("estado_pedido")
public class Estado_pedidoController {
    
    @Autowired
    Estado_pedidoService estado_pedidoService;

    @CrossOrigin(origins = "http://localhost:4200")

    @GetMapping
    public ArrayList<Estado_pedidoModel> listarTodos(){
        return this.estado_pedidoService.listar();
    }

    @PostMapping
    public Estado_pedidoModel registrar(@RequestBody Estado_pedidoModel estado_pedido){
        return this.estado_pedidoService.nuevo(estado_pedido);
    }

    @PutMapping("/{id}")
    public Estado_pedidoModel actualizar(@PathVariable Long id, @RequestBody Estado_pedidoModel estado_pedido) {
        return this.estado_pedidoService.actualizar(id, estado_pedido);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        this.estado_pedidoService.eliminar(id);
    }
}
