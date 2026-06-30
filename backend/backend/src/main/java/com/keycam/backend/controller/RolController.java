package com.keycam.backend.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keycam.backend.model.RolModel;
import com.keycam.backend.services.RolService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/rol")
public class RolController {

    @Autowired
    RolService rolService;

    @CrossOrigin(origins = "http://localhost:4200")

    @GetMapping
    public ArrayList<RolModel> listarTodos(){
        return this.rolService.listar();
    }

    @PostMapping
    public RolModel registrar(@RequestBody RolModel rol){
        return this.rolService.nuevo(rol);
    }

    @PutMapping("/{id}")
        public RolModel actualizar(@PathVariable Long id, @RequestBody RolModel rol) {
        return this.rolService.actualizar(id, rol);
    }

    @DeleteMapping("/{id}")
        public void eliminar(@PathVariable Long id) {
        this.rolService.eliminar(id);
    }
}
