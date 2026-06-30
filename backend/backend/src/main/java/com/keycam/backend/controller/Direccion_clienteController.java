package com.keycam.backend.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keycam.backend.model.Direccion_clienteModel;
import com.keycam.backend.services.Direccion_clienteService;

@RestController
@RequestMapping("/direcciones_cliente")
public class Direccion_clienteController {

    @Autowired
    Direccion_clienteService direccion_clienteService;

    @CrossOrigin(origins = "http://localhost:4200")

    @GetMapping
    public ArrayList<Direccion_clienteModel> listarTodos() {
        return this.direccion_clienteService.listar();
    }

    // Listar direcciones de un cliente específico
    @GetMapping("/cliente/{idCliente}")
    public List<Direccion_clienteModel> listarPorCliente(@PathVariable Long idCliente) {
        return this.direccion_clienteService.listarPorCliente(idCliente);
    }

    @PostMapping
    public Direccion_clienteModel registrar(@RequestBody Direccion_clienteModel direccion) {
        return this.direccion_clienteService.nuevo(direccion);
    }

    @GetMapping("/{id}")
    public Optional<Direccion_clienteModel> obtenerPorId(@PathVariable Long id){
        return this.direccion_clienteService.obtenerPorId(id);
    }

    @PutMapping("/{id}")
    public Direccion_clienteModel actualizar(@PathVariable Long id, @RequestBody Direccion_clienteModel direccion){
        return this.direccion_clienteService.actualizar(id, direccion);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        this.direccion_clienteService.eliminar(id);
    }
}