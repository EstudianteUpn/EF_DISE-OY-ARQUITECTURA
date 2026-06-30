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
@Table(name = "conciliacion_pago")
public class Conciliacion_pagoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private LocalDateTime fecha_conciliacion;

    @ManyToOne
    @JoinColumn(name = "id_movimiento_bancario") 
    private Movimiento_bancarioModel movimiento_bancario;

    @ManyToOne
    @JoinColumn(name = "id_transaccion_pago_online") 
    private Transaccion_pago_onlineModel transaccion_pago_online;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getFecha_conciliacion() {
        return fecha_conciliacion;
    }

    public void setFecha_conciliacion(LocalDateTime fecha_conciliacion) {
        this.fecha_conciliacion = fecha_conciliacion;
    }

    public Movimiento_bancarioModel getMovimiento_bancario() {
        return movimiento_bancario;
    }

    public void setMovimiento_bancario(Movimiento_bancarioModel movimiento_bancario) {
        this.movimiento_bancario = movimiento_bancario;
    }

    public Transaccion_pago_onlineModel getTransaccion_pago_online() {
        return transaccion_pago_online;
    }

    public void setTransaccion_pago_online(Transaccion_pago_onlineModel transaccion_pago_online) {
        this.transaccion_pago_online = transaccion_pago_online;
    }

    
}
