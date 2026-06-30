package com.keycam.backend.controller;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keycam.backend.model.Conciliacion_pagoModel;
import com.keycam.backend.services.Conciliacion_pagoService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/conciliacion_pago")
public class Conciliacion_pagoController {
    
    @Autowired
    Conciliacion_pagoService conciliacion_pagoService;

    @CrossOrigin(origins = "http://localhost:4200") 

    @GetMapping
    public ArrayList<Conciliacion_pagoModel> listarTodos(){
        return this.conciliacion_pagoService.listar();
    }

    @PostMapping
    public Conciliacion_pagoModel registrar(@RequestBody Conciliacion_pagoModel conciliacion_pago){
        return this.conciliacion_pagoService.nuevo(conciliacion_pago);
    }

    @GetMapping("/{id}")
    public Optional<Conciliacion_pagoModel> obtenerPorId(@PathVariable Long id){
        return this.conciliacion_pagoService.obtenerPorId(id);
    }
}
