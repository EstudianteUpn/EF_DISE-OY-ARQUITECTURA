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

import com.keycam.backend.dto.PedidoConfirmacionRequestDTO;
import com.keycam.backend.model.PedidoModel;
import com.keycam.backend.services.PedidoService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/pedido")
public class PedidoController {
    
    @Autowired
    PedidoService pedidoService;

    @CrossOrigin(origins = "http://localhost:4200") 

    @GetMapping
    public ArrayList<PedidoModel> listarTodos(){
        return this.pedidoService.listar();
    }

    @PostMapping
    public PedidoModel registrar(@RequestBody PedidoModel pedido){
        return this.pedidoService.nuevo(pedido);
    }

    @GetMapping("/{id}")
    public Optional<PedidoModel> obtenerPorId(@PathVariable Long id){
        return this.pedidoService.obtenerPorId(id);
    }

    @PutMapping("/{id}")
    public PedidoModel actualizar(@PathVariable Long id, @RequestBody PedidoModel pedido){
        return this.pedidoService.actualizar(id, pedido);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        this.pedidoService.eliminar(id);
    }

    @PostMapping("/confirmar")
    public ResponseEntity<PedidoModel> confirmarPedido(@RequestBody PedidoConfirmacionRequestDTO dto) {
        PedidoModel pedidoConfirmado = pedidoService.confirmarPedido(dto);
        return ResponseEntity.ok(pedidoConfirmado);
    }
}
