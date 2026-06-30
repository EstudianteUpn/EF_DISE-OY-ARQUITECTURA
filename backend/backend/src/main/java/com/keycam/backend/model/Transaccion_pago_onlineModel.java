package com.keycam.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "transaccion_pago_online")
public class Transaccion_pago_onlineModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String codigo_transaccion;
    @Column
    private String numero_operacion;
    @Column
    private String autorizacion;
    @Column
    private String medio_pago;
    @Column
    private String moneda;
    @Column
    private String estado_transaccion;
    @Column
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime fecha_transaccion;
    @Column
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime fecha_abono;

    @ManyToOne
    @JoinColumn(name = "id_pago")
    private PagoModel pago;

    @PrePersist
    public void prePersist() {
        this.fecha_transaccion = LocalDateTime.now();
        this.fecha_abono = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo_transaccion() {
        return codigo_transaccion;
    }

    public void setCodigo_transaccion(String codigo_transaccion) {
        this.codigo_transaccion = codigo_transaccion;
    }

    public String getNumero_operacion() {
        return numero_operacion;
    }

    public void setNumero_operacion(String numero_operacion) {
        this.numero_operacion = numero_operacion;
    }

    public String getAutorizacion() {
        return autorizacion;
    }

    public void setAutorizacion(String autorizacion) {
        this.autorizacion = autorizacion;
    }

    public String getMedio_pago() {
        return medio_pago;
    }

    public void setMedio_pago(String medio_pago) {
        this.medio_pago = medio_pago;
    }

    public String getMoneda() {
        return moneda;
    }

    public void setMoneda(String moneda) {
        this.moneda = moneda;
    }

    public String getEstado_transaccion() {
        return estado_transaccion;
    }

    public void setEstado_transaccion(String estado_transaccion) {
        this.estado_transaccion = estado_transaccion;
    }

    public LocalDateTime getFecha_transaccion() {
        return fecha_transaccion;
    }

    public void setFecha_transaccion(LocalDateTime fecha_transaccion) {
        this.fecha_transaccion = fecha_transaccion;
    }

    public LocalDateTime getFecha_abono() {
        return fecha_abono;
    }

    public void setFecha_abono(LocalDateTime fecha_abono) {
        this.fecha_abono = fecha_abono;
    }

    public PagoModel getPago() {
        return pago;
    }

    public void setPago(PagoModel pago) {
        this.pago = pago;
    }

    
}
