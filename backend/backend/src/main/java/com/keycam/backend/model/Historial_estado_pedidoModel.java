package com.keycam.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "historial_estado_pedido")
public class Historial_estado_pedidoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private LocalDateTime fecha_cambio;
    @Column
    private String observacion;

    @ManyToOne
    @JoinColumn(name = "id_pedido") 
    private PedidoModel pedido;

    @ManyToOne
    @JoinColumn(name = "id_estado_pedido")
    private Estado_pedidoModel estado;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getFecha_cambio() {
        return fecha_cambio;
    }

    public void setFecha_cambio(LocalDateTime fecha_cambio) {
        this.fecha_cambio = fecha_cambio;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public PedidoModel getPedido() {
        return pedido;
    }

    public void setPedido(PedidoModel pedido) {
        this.pedido = pedido;
    }

    public Estado_pedidoModel getEstado() {
        return estado;
    }

    public void setEstado(Estado_pedidoModel estado) {
        this.estado = estado;
    }

    
}
