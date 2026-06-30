package com.keycam.backend.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keycam.backend.model.Tipo_pagoModel;
import com.keycam.backend.services.Tipo_pagoService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/tipo_pago")
public class Tipo_pagoController {
    
    @Autowired
    Tipo_pagoService tipo_pagoService;

    @CrossOrigin(origins = "http://localhost:4200")

    @GetMapping
    public ArrayList<Tipo_pagoModel> listarTodos(){
        return this.tipo_pagoService.listar();
    }

    @PostMapping
    public Tipo_pagoModel registrar(@RequestBody Tipo_pagoModel tipo_pago){
        return this.tipo_pagoService.nuevo(tipo_pago);
    }

    @PutMapping ("/{id}")
    public Tipo_pagoModel actualizar(@PathVariable Long id, @RequestBody Tipo_pagoModel tipo_pago){
        return this.tipo_pagoService.actualizar(id, tipo_pago);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        this.tipo_pagoService.eliminar(id);
    }

}
