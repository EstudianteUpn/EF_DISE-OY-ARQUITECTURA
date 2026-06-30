package com.keycam.backend.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keycam.backend.model.Tipo_entregaModel;
import com.keycam.backend.services.Tipo_entregaService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/tipo_entrega")
public class Tipo_entregaController {
    
    @Autowired
    Tipo_entregaService tipo_entregaService;

    @CrossOrigin(origins = "http://localhost:4200")

    @GetMapping
    public ArrayList<Tipo_entregaModel> listarTodos(){
        return this.tipo_entregaService.listar();
    }

    @PostMapping
    public Tipo_entregaModel registrar(@RequestBody Tipo_entregaModel tipo_entrega){
        return this.tipo_entregaService.nuevo(tipo_entrega);
    }

    @PutMapping("/{id}")
    public Tipo_entregaModel actualizar(@PathVariable Long id, @RequestBody Tipo_entregaModel tipo_entrega) {
        return this.tipo_entregaService.actualizar(id, tipo_entrega);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        this.tipo_entregaService.eliminar(id);
    }
}
