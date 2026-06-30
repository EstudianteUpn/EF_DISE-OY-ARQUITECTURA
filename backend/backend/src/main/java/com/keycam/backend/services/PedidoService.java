package com.keycam.backend.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keycam.backend.dto.PedidoConfirmacionRequestDTO;
import com.keycam.backend.model.EntregaModel;
import com.keycam.backend.model.Estado_entregaModel;
import com.keycam.backend.model.Estado_pagoModel;
import com.keycam.backend.model.PagoModel;
import com.keycam.backend.model.PedidoModel;
import com.keycam.backend.model.Tipo_entregaModel;
import com.keycam.backend.model.Tipo_pagoModel;
import com.keycam.backend.repository.EntregaRepository;
import com.keycam.backend.repository.Estado_entregaRepository;
import com.keycam.backend.repository.Estado_pagoRepository;
import com.keycam.backend.repository.PagoRepository;
import com.keycam.backend.repository.PedidoRepository;
import com.keycam.backend.repository.Tipo_entregaRepository;
import com.keycam.backend.repository.Tipo_pagoRepository;

import jakarta.transaction.Transactional;

@Service
public class PedidoService {
    @Autowired
    PedidoRepository pedidoRepository;

    @Autowired
    PagoRepository pagoRepository;

    @Autowired
    EntregaRepository entregaRepository;

    @Autowired
    Estado_pagoRepository estadoPagoRepository;

    @Autowired
    Estado_entregaRepository estadoEntregaRepository;

    @Autowired
    Tipo_pagoRepository tipoPagoRepository;

    @Autowired
    Tipo_entregaRepository tipoEntregaRepository;

    public ArrayList<PedidoModel> listar() {
        return (ArrayList<PedidoModel>) pedidoRepository.findAll();
    }

    public PedidoModel nuevo(PedidoModel pedido) {
        return pedidoRepository.save(pedido);
    }

    public Optional<PedidoModel> obtenerPorId(Long id) {
        return pedidoRepository.findById(id);
    }

    public PedidoModel actualizar(Long id, PedidoModel pedido) {
        PedidoModel existente = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado: " + id));

        existente.setTotal(pedido.getTotal());
        existente.setTipo_venta(pedido.getTipo_venta());
        existente.setEstado(pedido.getEstado());
        existente.setCliente(pedido.getCliente());
        existente.setDireccion(pedido.getDireccion());

        return pedidoRepository.save(existente);
    }

    public void eliminar(Long id) {
        pedidoRepository.deleteById(id);
    }

    @Transactional
    public PedidoModel confirmarPedido(PedidoConfirmacionRequestDTO dto) {

        PedidoModel pedido = dto.getPedido();
        PedidoModel pedidoGuardado = pedidoRepository.save(pedido);

        Tipo_pagoModel tipoPago = tipoPagoRepository.findById(dto.getTipoPagoId())
                .orElseThrow(() -> new RuntimeException("Tipo de pago no encontrado: " + dto.getTipoPagoId()));

        Estado_pagoModel estadoPagoPendiente = estadoPagoRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Estado de pago 'Pendiente' (id=1) no encontrado"));

        PagoModel pago = new PagoModel();
        pago.setMonto(pedidoGuardado.getTotal());
        pago.setFecha_pago(LocalDateTime.now());
        pago.setEstado(estadoPagoPendiente);
        pago.setTipo_pago(tipoPago);
        pago.setPedido(pedidoGuardado);
        pagoRepository.save(pago);

        Tipo_entregaModel tipoEntrega = tipoEntregaRepository.findById(dto.getTipoEntregaId())
                .orElseThrow(() -> new RuntimeException("Tipo de entrega no encontrado: " + dto.getTipoEntregaId()));

        Estado_entregaModel estadoEntregaPendiente = estadoEntregaRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Estado de entrega 'Pendiente' (id=1) no encontrado"));

        EntregaModel entrega = new EntregaModel();
        entrega.setFecha_inicio(LocalDateTime.now());
        entrega.setFecha_asignada(null);
        entrega.setFecha_entrega(null);
        entrega.setTipo_entrega(tipoEntrega);
        entrega.setEstado_entrega(estadoEntregaPendiente);
        entrega.setPedido(pedidoGuardado);

        if (dto.getTipoEntregaId() != null && dto.getTipoEntregaId() == 2L) {
            entrega.setDireccion_cliente(pedidoGuardado.getDireccion());
        }

        entregaRepository.save(entrega);

        return pedidoGuardado;
    }
}
