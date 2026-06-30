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
@Table(name = "movimiento_bancario")
public class Movimiento_bancarioModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String numero_operacion;
    @Column
    private Double monto;
    @Column
    private LocalDateTime fecha_movimiento;
    @Column
    private String banco;
    @Column
    private String referencia;

    @ManyToOne
    @JoinColumn(name = "id_estado_conciliacion") 
    private Estado_conciliacionModel estado_conciliacion;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumero_operacion() {
        return numero_operacion;
    }

    public void setNumero_operacion(String numero_operacion) {
        this.numero_operacion = numero_operacion;
    }

    public Double getMonto() {
        return monto;
    }

    public void setMonto(Double monto) {
        this.monto = monto;
    }

    public LocalDateTime getFecha_movimiento() {
        return fecha_movimiento;
    }

    public void setFecha_movimiento(LocalDateTime fecha_movimiento) {
        this.fecha_movimiento = fecha_movimiento;
    }

    public String getBanco() {
        return banco;
    }

    public void setBanco(String banco) {
        this.banco = banco;
    }

    public String getReferencia() {
        return referencia;
    }

    public void setReferencia(String referencia) {
        this.referencia = referencia;
    }

    public Estado_conciliacionModel getEstado_conciliacion() {
        return estado_conciliacion;
    }

    public void setEstado_conciliacion(Estado_conciliacionModel estado_conciliacion) {
        this.estado_conciliacion = estado_conciliacion;
    }

    
}
