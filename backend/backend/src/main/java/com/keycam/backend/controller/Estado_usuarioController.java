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

import com.keycam.backend.model.Estado_usuarioModel;
import com.keycam.backend.services.Estado_usuarioService;

@RestController
@RequestMapping("/estado_usuarios")
public class Estado_usuarioController {

    @Autowired
    Estado_usuarioService estado_usuarioService;

    @CrossOrigin(origins = "http://localhost:4200")

    @GetMapping
    public ArrayList<Estado_usuarioModel> listarTodos() {
        return this.estado_usuarioService.listar();
    }

    @PostMapping
    public Estado_usuarioModel registrar(@RequestBody Estado_usuarioModel estado_usuario) {
        return this.estado_usuarioService.nuevo(estado_usuario);
    }

    @PutMapping("/{id}")
    public Estado_usuarioModel actualizar(@PathVariable Long id, @RequestBody Estado_usuarioModel estado_usuario) {
        return this.estado_usuarioService.actualizar(id, estado_usuario);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        this.estado_usuarioService.eliminar(id);
    }
}