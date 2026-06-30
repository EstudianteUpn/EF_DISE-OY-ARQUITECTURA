package com.keycam.backend.controller;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keycam.backend.model.Movimiento_bancarioModel;
import com.keycam.backend.services.Movimiento_bancarioService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/movimiento_bancario")
public class Movimiento_bancarioController {
    
    @Autowired
    Movimiento_bancarioService movimiento_bancarioService;

    @CrossOrigin(origins = "http://localhost:4200") 

    @GetMapping
    public ArrayList<Movimiento_bancarioModel> listarTodos(){
        return this.movimiento_bancarioService.listar();
    }

    @PostMapping
    public Movimiento_bancarioModel registrar(@RequestBody Movimiento_bancarioModel movimiento_bancario){
        return this.movimiento_bancarioService.nuevo(movimiento_bancario);
    }

    @GetMapping("/{id}")
    public Optional<Movimiento_bancarioModel> obtenerPorId(@PathVariable Long id){
        return this.movimiento_bancarioService.obtenerPorId(id);
    }
}
