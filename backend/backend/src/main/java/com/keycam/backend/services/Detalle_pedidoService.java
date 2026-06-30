package com.keycam.backend.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.model.Detalle_pedidoModel;
import com.keycam.backend.model.StockModel;
import com.keycam.backend.repository.Detalle_pedidoRepository;
import com.keycam.backend.repository.StockRepository;

@Service
public class Detalle_pedidoService {
    @Autowired
    Detalle_pedidoRepository detalle_pedidoRepository;

    @Autowired
    StockRepository stockRepository;

    public ArrayList<Detalle_pedidoModel> listar() {
        return (ArrayList<Detalle_pedidoModel>) detalle_pedidoRepository.findAll();
    }

    public Detalle_pedidoModel nuevo(Detalle_pedidoModel detalle_pedido) {
        Long idProducto = detalle_pedido.getProducto().getId();
        int cantidadVendida = detalle_pedido.getCantidad();

        StockModel stock = stockRepository.findByProductoId(idProducto);

        if (stock == null) {
            throw new RuntimeException("No existe registro de stock para este producto");
        }

        if (stock.getCantidad() < cantidadVendida) {
            throw new RuntimeException("Stock insuficiente. Disponible: " + stock.getCantidad());
        }

        // Descontar stock
        stock.setCantidad(stock.getCantidad() - cantidadVendida);
        stockRepository.save(stock);

        // Guardar el detalle de pedido
        return detalle_pedidoRepository.save(detalle_pedido);
    }

    public Optional<Detalle_pedidoModel> obtenerPorId(Long id) {
        return detalle_pedidoRepository.findById(id);
    }

    public Detalle_pedidoModel actualizar(Long id, Detalle_pedidoModel detalle_pedido) {
        detalle_pedido.setId(id);
        return detalle_pedidoRepository.save(detalle_pedido);
    }

    public void eliminar(Long id) {
        detalle_pedidoRepository.deleteById(id);
    }

    public ArrayList<Detalle_pedidoModel> listarPorPedido(Long pedidoId) {
    return (ArrayList<Detalle_pedidoModel>) detalle_pedidoRepository.findByPedidoId(pedidoId);
    }
}