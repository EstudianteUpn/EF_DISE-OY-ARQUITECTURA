package com.keycam.backend.controller;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keycam.backend.model.Historial_estado_entregaModel;
import com.keycam.backend.services.Historial_estado_entregaService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/historial_estado_entrega")
public class Historial_estado_entregaController {
    
    @Autowired
    Historial_estado_entregaService historial_estado_entregaService;

    @CrossOrigin(origins = "http://localhost:4200") 

    @GetMapping
    public ArrayList<Historial_estado_entregaModel> listarTodos(){
        return this.historial_estado_entregaService.listar();
    }

    @PostMapping
    public Historial_estado_entregaModel registrar(@RequestBody Historial_estado_entregaModel historial_estado_entrega){
        return this.historial_estado_entregaService.nuevo(historial_estado_entrega);
    }

    @GetMapping("/{id}")
    public Optional<Historial_estado_entregaModel> obtenerPorId(@PathVariable Long id){
        return this.historial_estado_entregaService.obtenerPorId(id);
    }
}
