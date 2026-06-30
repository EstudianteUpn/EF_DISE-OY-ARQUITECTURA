package com.keycam.backend.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.model.Estado_pedidoModel;
import com.keycam.backend.repository.Estado_pedidoRepository;

@Service
public class Estado_pedidoService {
    @Autowired
    Estado_pedidoRepository estado_pedidoRepository;

    public ArrayList<Estado_pedidoModel> listar() {
        return (ArrayList<Estado_pedidoModel>) estado_pedidoRepository.findAll();
    }

    public Estado_pedidoModel nuevo(Estado_pedidoModel estado_pedido) {
        return estado_pedidoRepository.save(estado_pedido);
    }

    public Estado_pedidoModel actualizar(Long id, Estado_pedidoModel estado_pedido) {
        estado_pedido.setId(id);
        return estado_pedidoRepository.save(estado_pedido);
    }

    public void eliminar(Long id) {
        estado_pedidoRepository.deleteById(id);
    }
}
