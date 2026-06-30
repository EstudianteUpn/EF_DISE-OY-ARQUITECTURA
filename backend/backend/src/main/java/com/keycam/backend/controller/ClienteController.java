package com.keycam.backend.controller;

import java.util.ArrayList;

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

import com.keycam.backend.model.ClienteModel;
import com.keycam.backend.services.ClienteService;

@RestController

@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    ClienteService clienteService;

    @CrossOrigin(origins = "http://localhost:4200")

    @GetMapping("/email/{email}")
    public ClienteModel buscarPorEmail(@PathVariable String email) {
        return this.clienteService.buscarPorEmail(email);
    }

    @GetMapping
    public ArrayList<ClienteModel> listarTodos() {
        return this.clienteService.listar();
    }

    @GetMapping("/{id}")
    public ClienteModel buscarPorId(@PathVariable Long id) {
        return this.clienteService.buscarPorId(id);
    }

    @PostMapping
    public ClienteModel registrar(@RequestBody ClienteModel cliente) {
        return this.clienteService.nuevo(cliente);
    }

    @PutMapping("/{id}")
    public ClienteModel actualizar(@PathVariable Long id, @RequestBody ClienteModel cliente) {
        return this.clienteService.actualizar(id, cliente);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        this.clienteService.eliminar(id);
    }
}