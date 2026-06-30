package com.keycam.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "productos")
public class ProductoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String nombre;
    @Column
    private String descripcion;
    @Column
    private Double precio;
    @Column
    private Double descuento;
    @Column
    private String imagen_url;
   
    @ManyToOne
    @JoinColumn(name = "id_estado_producto") 
    private Estado_productoModel estado;

    @ManyToOne
    @JoinColumn(name = "id_categoria_producto") 
    private Categoria_productoModel categoria;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Double getDescuento() {
        return descuento;
    }

    public void setDescuento(Double descuento) {
        this.descuento = descuento;
    }

    public String getImagen_url() {
        return imagen_url;
    }

    public void setImagen_url(String imagen_url) {
        this.imagen_url = imagen_url;
    }

    public Estado_productoModel getEstado() {
        return estado;
    }

    public void setEstado(Estado_productoModel estado) {
        this.estado = estado;
    }

    public Categoria_productoModel getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria_productoModel categoria) {
        this.categoria = categoria;
    }

    
    

    
}
