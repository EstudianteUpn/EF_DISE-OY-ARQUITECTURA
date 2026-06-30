package com.keycam.backend.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keycam.backend.model.Estado_pagoModel;
import com.keycam.backend.services.Estado_pagoService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/estado_pago")
public class Estado_pagoController {
    
    @Autowired
    Estado_pagoService estado_pagoService;

    @CrossOrigin(origins = "http://localhost:4200")

    @GetMapping
    public ArrayList<Estado_pagoModel> listarTodos(){
        return this.estado_pagoService.listar();
    }

    @PostMapping
    public Estado_pagoModel registrar(@RequestBody Estado_pagoModel estado_pago){
        return this.estado_pagoService.nuevo(estado_pago);
    }

    @PutMapping("/{id}")
    public Estado_pagoModel actualizar(@PathVariable Long id, @RequestBody Estado_pagoModel estado_pago) {
        return this.estado_pagoService.actualizar(id, estado_pago);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        this.estado_pagoService.eliminar(id);
    }
}
