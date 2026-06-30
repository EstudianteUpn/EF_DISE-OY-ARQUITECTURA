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

import com.keycam.backend.model.EntregaModel;
import com.keycam.backend.services.EntregaService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/entrega")
public class EntregaController {
    
    @Autowired
    EntregaService entregaService;

    @CrossOrigin(origins = "http://localhost:4200")

    @GetMapping
    public ArrayList<EntregaModel> listarTodos(){
        return this.entregaService.listar();
    }

    @PostMapping
    public EntregaModel registrar(@RequestBody EntregaModel entrega){
        return this.entregaService.nuevo(entrega);
    }

    @GetMapping("/{id}")
    public Optional<EntregaModel> obtenerPorId(@PathVariable Long id){
        return this.entregaService.obtenerPorId(id);
    }

    @PutMapping("/{id}")
    public EntregaModel actualizar(@PathVariable Long id, @RequestBody EntregaModel entrega){
        return this.entregaService.actualizar(id, entrega);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        this.entregaService.eliminar(id);
    }
}
