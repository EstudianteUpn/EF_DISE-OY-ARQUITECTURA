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

import com.keycam.backend.model.PagoModel;
import com.keycam.backend.services.PagoService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/pago")
public class PagoController {
    
    @Autowired
    PagoService pagoService;

    @CrossOrigin(origins = "http://localhost:4200") 

    @GetMapping
    public ArrayList<PagoModel> listarTodos(){
        return this.pagoService.listar();
    }

    @PostMapping
    public PagoModel registrar(@RequestBody PagoModel pago){
        return this.pagoService.nuevo(pago);
    }

    @GetMapping("/{id}")
    public Optional<PagoModel> obtenerPorId(@PathVariable Long id){
        return this.pagoService.obtenerPorId(id);
    }

    @PutMapping("/{id}")
    public PagoModel actualizar(@PathVariable Long id, @RequestBody PagoModel pago){
        return this.pagoService.actualizar(id, pago);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        this.pagoService.eliminar(id);
    }
}
