package com.keycam.backend.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keycam.backend.model.Estado_entregaModel;
import com.keycam.backend.services.Estado_entregaService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/estado_entrega")
public class Estado_entregaController {
    
    @Autowired
    Estado_entregaService estado_entregaService;

    @CrossOrigin(origins = "http://localhost:4200")

    @GetMapping
    public ArrayList<Estado_entregaModel> listarTodos(){
        return this.estado_entregaService.listar();
    }

    @PostMapping
    public Estado_entregaModel registrar(@RequestBody Estado_entregaModel estado_entrega){
        return this.estado_entregaService.nuevo(estado_entrega);
    }

    @PutMapping("/{id}")
    public Estado_entregaModel actualizar(@PathVariable Long id, @RequestBody Estado_entregaModel estado_entrega) {
        return this.estado_entregaService.actualizar(id, estado_entrega);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        this.estado_entregaService.eliminar(id);
    }
}
