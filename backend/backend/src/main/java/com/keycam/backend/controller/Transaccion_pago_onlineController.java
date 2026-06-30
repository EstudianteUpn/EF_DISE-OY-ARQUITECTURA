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

import com.keycam.backend.model.Transaccion_pago_onlineModel;
import com.keycam.backend.services.Transaccion_pago_onlineService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/transaccion_pago_online")
public class Transaccion_pago_onlineController {
    
    @Autowired
    Transaccion_pago_onlineService transaccion_pago_onlineService;

    @CrossOrigin(origins = "http://localhost:4200") 

    @GetMapping
    public ArrayList<Transaccion_pago_onlineModel> listarTodos(){
        return this.transaccion_pago_onlineService.listar();
    }

    @PostMapping
    public Transaccion_pago_onlineModel registrar(@RequestBody Transaccion_pago_onlineModel transaccion_pago_online){
        return this.transaccion_pago_onlineService.nuevo(transaccion_pago_online);
    }

    @GetMapping("/{id}")
    public Optional<Transaccion_pago_onlineModel> obtenerPorId(@PathVariable Long id){
        return this.transaccion_pago_onlineService.obtenerPorId(id);
    }

    @PutMapping("/{id}")
    public Transaccion_pago_onlineModel actualizar(@PathVariable Long id, @RequestBody Transaccion_pago_onlineModel transaccion_pago_online){
        return this.transaccion_pago_onlineService.actualizar(id, transaccion_pago_online);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        this.transaccion_pago_onlineService.eliminar(id);
    }
}
