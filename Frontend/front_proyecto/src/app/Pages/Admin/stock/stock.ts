import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService } from '../../../Services/StockService';
import { StockModel, StockRequestModel } from '../../../Models/StockModel';
import { ProductoModel } from '../../../Models/ProductosModels';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock.html',
  styleUrl: './stock.css',
})
export class Stock {
  private stockService = inject(StockService);
 
  lista: StockModel[] = [];
  productos: ProductoModel[] = [];
 
  
  nuevoProductoId: number = 0;
  nuevaCantidad: number = 0;
  nuevoStockMinimo: number = 0;
 
  editandoId: number | null = null;
  editandoProductoId: number = 0;
  editandoCantidad: number = 0;
  editandoStockMinimo: number = 0;
 
  ngOnInit() {
    this.cargarLista();
    this.cargarProductos();
  }
 
  cargarLista() {
    this.stockService.listar().subscribe({
      next: (data) => this.lista = data,
      error: (err) => console.log(err.message)
    });
  }
 
  cargarProductos() {
    this.stockService.listarProductos().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.log(err.message)
    });
  }
 
  registrar() {
    if (this.nuevoProductoId === 0 || this.nuevaCantidad < 0 || this.nuevoStockMinimo < 0) return;
 
    const nuevo: StockRequestModel = {
      id: 0,
      cantidad: this.nuevaCantidad,
      stock_minimo: this.nuevoStockMinimo,
      producto: { id: this.nuevoProductoId }
    };
 
    this.stockService.crear(nuevo).subscribe({
      next: () => {
        this.nuevoProductoId = 0;
        this.nuevaCantidad = 0;
        this.nuevoStockMinimo = 0;
        this.cargarLista();
      },
      error: (err) => console.log(err.message)
    });
  }
 
  iniciarEdicion(item: StockModel) {
    this.editandoId = item.id;
    this.editandoProductoId = item.producto?.id ?? 0;
    this.editandoCantidad = item.cantidad;
    this.editandoStockMinimo = item.stock_minimo;
  }
 
  guardarEdicion() {
    if (
      this.editandoId === null ||
      this.editandoProductoId === 0 ||
      this.editandoCantidad < 0 ||
      this.editandoStockMinimo < 0
    ) return;
 
    const actualizado: StockRequestModel = {
      id: this.editandoId,
      cantidad: this.editandoCantidad,
      stock_minimo: this.editandoStockMinimo,
      producto: { id: this.editandoProductoId }
    };
 
    this.stockService.actualizar(this.editandoId, actualizado).subscribe({
      next: () => {
        this.cancelarEdicion();
        this.cargarLista();
      },
      error: (err) => console.log(err.message)
    });
  }
 
  cancelarEdicion() {
    this.editandoId = null;
    this.editandoProductoId = 0;
    this.editandoCantidad = 0;
    this.editandoStockMinimo = 0;
  }
 
  eliminar(id: number) {
    this.stockService.eliminar(id).subscribe({
      next: () => this.cargarLista(),
      error: (err) => console.log(err.message)
    });
  }
 
  stockBajo(item: StockModel): boolean {
    return item.cantidad <= item.stock_minimo;
  }
}
