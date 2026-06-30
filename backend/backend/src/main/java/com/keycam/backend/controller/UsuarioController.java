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

import com.keycam.backend.model.UsuarioModel;
import com.keycam.backend.services.UsuarioServices;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.keycam.backend.dto.RegistroClienteDTO;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {
    
    @Autowired
    UsuarioServices usuarioServices;

    @CrossOrigin(origins = "http://localhost:4200")

    @GetMapping("/email/{email}")
    public UsuarioModel obtenerPorEmail(@PathVariable String email) {
        return this.usuarioServices.obtenerPorEmail(email);
    }

    @GetMapping
    public ArrayList<UsuarioModel> listarTodos(){
        return this.usuarioServices.listar();
    }

    @PostMapping
    public UsuarioModel registrar(@RequestBody UsuarioModel usuario){
        return this.usuarioServices.nuevo(usuario);
    }

    @GetMapping("/{id}")
    public Optional<UsuarioModel> obtenerPorId(@PathVariable Long id){
        return this.usuarioServices.obtenerPorId(id);
    }

    @PutMapping("/{id}")
    public UsuarioModel actualizar(@PathVariable Long id, @RequestBody UsuarioModel usuario){
        return this.usuarioServices.actualizar(id, usuario);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        this.usuarioServices.eliminar(id);
    }

    @PostMapping("/registro")
    @CrossOrigin(origins = "http://localhost:4200")
    public UsuarioModel registrarCliente(@RequestBody RegistroClienteDTO datos) {
        return this.usuarioServices.registrarCliente(datos);
    }
}
