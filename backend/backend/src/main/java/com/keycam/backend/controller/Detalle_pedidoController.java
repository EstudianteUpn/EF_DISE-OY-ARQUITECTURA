package com.keycam.backend.controller;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keycam.backend.model.Detalle_pedidoModel;
import com.keycam.backend.services.Detalle_pedidoService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/detalle_pedido")
public class Detalle_pedidoController {
    
    @Autowired
    Detalle_pedidoService detalle_pedidoService;

    @CrossOrigin(origins = "http://localhost:4200")

    @GetMapping
    public ArrayList<Detalle_pedidoModel> listarTodos(){
        return this.detalle_pedidoService.listar();
    }

    @GetMapping("/pedido/{pedidoId}")
    public ArrayList<Detalle_pedidoModel> listarPorPedido(@PathVariable Long pedidoId){
        return this.detalle_pedidoService.listarPorPedido(pedidoId);
    }

    @PostMapping
    public ResponseEntity<?> registrar(@RequestBody Detalle_pedidoModel detalle_pedido) {
        try {
            Detalle_pedidoModel nuevo = this.detalle_pedidoService.nuevo(detalle_pedido);
            return ResponseEntity.ok(nuevo);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public Optional<Detalle_pedidoModel> obtenerPorId(@PathVariable Long id){
        return this.detalle_pedidoService.obtenerPorId(id);
    }

    @PutMapping("/{id}")
    public Detalle_pedidoModel actualizar(@PathVariable Long id, @RequestBody Detalle_pedidoModel detalle_pedido){
        return this.detalle_pedidoService.actualizar(id, detalle_pedido);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        this.detalle_pedidoService.eliminar(id);
    }
}