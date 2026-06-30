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
@Table(name = "entrega")
public class EntregaModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private LocalDateTime fecha_asignada;
    @Column
    private LocalDateTime fecha_inicio;
    @Column
    private LocalDateTime fecha_entrega;
    @Column
    private String empresa_externa;
    @Column
    private String codigo_seguimiento;

    @ManyToOne
    @JoinColumn(name = "id_tipo_entrega") 
    private Tipo_entregaModel tipo_entrega;

    @ManyToOne
    @JoinColumn(name = "id_estado_entrega") 
    private Estado_entregaModel estado_entrega;

    @ManyToOne
    @JoinColumn(name = "id_pedido")  
    private PedidoModel pedido;

    @ManyToOne
    @JoinColumn(name = "id_direccion_cliente") 
    private Direccion_clienteModel direccion_cliente;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getFecha_asignada() {
        return fecha_asignada;
    }

    public void setFecha_asignada(LocalDateTime fecha_asignada) {
        this.fecha_asignada = fecha_asignada;
    }

    public LocalDateTime getFecha_inicio() {
        return fecha_inicio;
    }

    public void setFecha_inicio(LocalDateTime fecha_inicio) {
        this.fecha_inicio = fecha_inicio;
    }

    public LocalDateTime getFecha_entrega() {
        return fecha_entrega;
    }

    public void setFecha_entrega(LocalDateTime fecha_entrega) {
        this.fecha_entrega = fecha_entrega;
    }

    public String getEmpresa_externa() {
        return empresa_externa;
    }

    public void setEmpresa_externa(String empresa_externa) {
        this.empresa_externa = empresa_externa;
    }

    public String getCodigo_seguimiento() {
        return codigo_seguimiento;
    }

    public void setCodigo_seguimiento(String codigo_seguimiento) {
        this.codigo_seguimiento = codigo_seguimiento;
    }

    public Tipo_entregaModel getTipo_entrega() {
        return tipo_entrega;
    }

    public void setTipo_entrega(Tipo_entregaModel tipo_entrega) {
        this.tipo_entrega = tipo_entrega;
    }

    public Estado_entregaModel getEstado_entrega() {
        return estado_entrega;
    }

    public void setEstado_entrega(Estado_entregaModel estado_entrega) {
        this.estado_entrega = estado_entrega;
    }

    public PedidoModel getPedido() {
        return pedido;
    }

    public void setPedido(PedidoModel pedido) {
        this.pedido = pedido;
    }

    public Direccion_clienteModel getDireccion_cliente() {
        return direccion_cliente;
    }

    public void setDireccion_cliente(Direccion_clienteModel direccion_cliente) {
        this.direccion_cliente = direccion_cliente;
    }

    
}
