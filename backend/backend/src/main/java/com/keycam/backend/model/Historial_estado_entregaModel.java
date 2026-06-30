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
@Table(name = "historial_estado_entrega")
public class Historial_estado_entregaModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private LocalDateTime fecha_cambio;

    @ManyToOne
    @JoinColumn(name = "id_entrega") 
    private EntregaModel entrega;

    @ManyToOne
    @JoinColumn(name = "id_estado_entrega")
    private Estado_entregaModel estadoEntrega;

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

    public EntregaModel getEntrega() {
        return entrega;
    }

    public void setEntrega(EntregaModel entrega) {
        this.entrega = entrega;
    }

    public Estado_entregaModel getEstadoEntrega() {
        return estadoEntrega;
    }

    public void setEstadoEntrega(Estado_entregaModel estadoEntrega) {
        this.estadoEntrega = estadoEntrega;
    }

    
}
