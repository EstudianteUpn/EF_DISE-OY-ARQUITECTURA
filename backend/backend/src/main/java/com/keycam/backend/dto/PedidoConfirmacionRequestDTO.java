package com.keycam.backend.dto;

import com.keycam.backend.model.PedidoModel;

public class PedidoConfirmacionRequestDTO {
    private PedidoModel pedido;
    private Long tipoEntregaId;
    private Long tipoPagoId;

    public PedidoModel getPedido() {
        return pedido;
    }

    public void setPedido(PedidoModel pedido) {
        this.pedido = pedido;
    }

    public Long getTipoEntregaId() {
        return tipoEntregaId;
    }

    public void setTipoEntregaId(Long tipoEntregaId) {
        this.tipoEntregaId = tipoEntregaId;
    }

    public Long getTipoPagoId() {
        return tipoPagoId;
    }

    public void setTipoPagoId(Long tipoPagoId) {
        this.tipoPagoId = tipoPagoId;
    }
}
