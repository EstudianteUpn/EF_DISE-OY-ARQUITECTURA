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

import com.keycam.backend.model.TelefonoModel;
import com.keycam.backend.services.TelefonoService;

@RestController
@RequestMapping("/telefonos")
public class TelefonoController {

    @Autowired
    TelefonoService telefonoService;

    @CrossOrigin(origins = "http://localhost:4200")

    @GetMapping
    public ArrayList<TelefonoModel> listarTodos() {
        return this.telefonoService.listar();
    }

    // Listar teléfonos de un cliente específico
    @GetMapping("/cliente/{idCliente}")
    public List<TelefonoModel> listarPorCliente(@PathVariable Long idCliente) {
        return this.telefonoService.listarPorCliente(idCliente);
    }

    @PostMapping
    public TelefonoModel registrar(@RequestBody TelefonoModel telefono) {
        return this.telefonoService.nuevo(telefono);
    }

    @GetMapping("/{id}")
    public Optional<TelefonoModel> obtenerPorId(@PathVariable Long id){
        return this.telefonoService.obtenerPorId(id);
    }

    @PutMapping("/{id}")
    public TelefonoModel actualizar(@PathVariable Long id, @RequestBody TelefonoModel telefono){
        return this.telefonoService.actualizar(id, telefono);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        this.telefonoService.eliminar(id);
    }
}