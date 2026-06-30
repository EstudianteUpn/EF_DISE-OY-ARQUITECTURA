import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaProductoService } from '../../../Services/CategoriaProductoService';
import { CategoriaProductoModel } from '../../../Models/CategoriaProductoModel';

@Component({
  selector: 'app-categoria-producto',
  imports: [CommonModule, FormsModule],
  templateUrl: './categoria-producto.html',
  styleUrl: './categoria-producto.css'
})
export class CategoriaProducto {
  private categoriaService = inject(CategoriaProductoService);

  lista: CategoriaProductoModel[] = [];

  nuevoNombre: string = '';
  nuevoTipo: string = '';

  editandoId: number | null = null;
  editandoNombre: string = '';
  editandoTipo: string = '';

  constructor() {
    this.cargarLista();
  }

  cargarLista() {
    this.categoriaService.listar().subscribe({
      next: (data) => this.lista = data,
      error: (err) => console.log(err.message)
    });
  }

  registrar() {
    if (!this.nuevoNombre.trim() || !this.nuevoTipo.trim()) return;
    const nuevo: CategoriaProductoModel = {
      id: 0,
      nombre: this.nuevoNombre,
      tipo_general: this.nuevoTipo
    };
    this.categoriaService.crear(nuevo).subscribe({
      next: () => {
        this.nuevoNombre = '';
        this.nuevoTipo = '';
        this.cargarLista();
      },
      error: (err) => console.log(err.message)
    });
  }

  iniciarEdicion(item: CategoriaProductoModel) {
    this.editandoId = item.id;
    this.editandoNombre = item.nombre;
    this.editandoTipo = item.tipo_general;
  }

  guardarEdicion() {
    if (!this.editandoNombre.trim() || !this.editandoTipo.trim() || this.editandoId === null) return;
    const actualizado: CategoriaProductoModel = {
      id: this.editandoId,
      nombre: this.editandoNombre,
      tipo_general: this.editandoTipo
    };
    this.categoriaService.actualizar(this.editandoId, actualizado).subscribe({
      next: () => {
        this.editandoId = null;
        this.editandoNombre = '';
        this.editandoTipo = '';
        this.cargarLista();
      },
      error: (err) => console.log(err.message)
    });
  }

  cancelarEdicion() {
    this.editandoId = null;
    this.editandoNombre = '';
    this.editandoTipo = '';
  }

  eliminar(id: number) {
    this.categoriaService.eliminar(id).subscribe({
      next: () => this.cargarLista(),
      error: (err) => console.log(err.message)
    });
  }
}