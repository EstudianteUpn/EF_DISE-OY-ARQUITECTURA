package com.keycam.backend.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keycam.backend.model.Estado_conciliacionModel;
import com.keycam.backend.services.Estado_conciliacionService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/estado_conciliacion")
public class Estado_conciliacionController {
    
    @Autowired
    Estado_conciliacionService estado_conciliacionService;

    @CrossOrigin(origins = "http://localhost:4200")

    @GetMapping
    public ArrayList<Estado_conciliacionModel> listarTodos(){
        return this.estado_conciliacionService.listar();
    }

    @PostMapping
    public Estado_conciliacionModel registrar(@RequestBody Estado_conciliacionModel estado_conciliacion){
        return this.estado_conciliacionService.nuevo(estado_conciliacion);
    }

    @PutMapping("/{id}")
    public Estado_conciliacionModel actualizar(@PathVariable Long id, @RequestBody Estado_conciliacionModel estado_conciliacion) {
        return this.estado_conciliacionService.actualizar(id, estado_conciliacion);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        this.estado_conciliacionService.eliminar(id);
    }
}
