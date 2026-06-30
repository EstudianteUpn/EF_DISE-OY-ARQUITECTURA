package com.keycam.backend.controller;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keycam.backend.model.Historial_estado_pedidoModel;
import com.keycam.backend.services.Historial_estado_pedidoService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/historial_estado_pedido")
public class Historial_estado_pedidoController {
    
    @Autowired
    Historial_estado_pedidoService historial_estado_pedidoService;

    @CrossOrigin(origins = "http://localhost:4200") 

    @GetMapping
    public ArrayList<Historial_estado_pedidoModel> listarTodos(){   
        return this.historial_estado_pedidoService.listar();
    }

    @PostMapping
    public Historial_estado_pedidoModel registrar(@RequestBody Historial_estado_pedidoModel historial){
        return this.historial_estado_pedidoService.nuevo(historial);
    }

    @GetMapping("/{id}")
    public Optional<Historial_estado_pedidoModel> obtenerPorId(@PathVariable Long id){
        return this.historial_estado_pedidoService.obtenerPorId(id);
    }
}
