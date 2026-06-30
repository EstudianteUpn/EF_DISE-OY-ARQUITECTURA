import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TelefonoService } from '../../../Services/TelefonoService';
import { TelefonoModel, TelefonoRequestModel } from '../../../Models/TelefonoModel';
import { ClienteModel } from '../../../Models/ClienteModel';
 
@Component({
  selector: 'app-telefono',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './telefono.html',
  styleUrl: './telefono.css'
})
export class Telefono implements OnInit {
  private telefonoService = inject(TelefonoService);
 
  lista: TelefonoModel[] = [];
  clientes: ClienteModel[] = [];

  tipos: string[] = ['Celular', 'Fijo', 'WhatsApp'];
 
 
  nuevoNumero: string = '';
  nuevoTipo: string = '';
  nuevoClienteId: number = 0;
 
  editandoId: number | null = null;
  editandoNumero: string = '';
  editandoTipo: string = '';
  editandoClienteId: number = 0;
 
  ngOnInit() {
    this.cargarLista();
    this.cargarClientes();
  }
 
  cargarLista() {
    this.telefonoService.listar().subscribe({
      next: (data) => this.lista = data,
      error: (err) => console.log(err.message)
    });
  }
 
  cargarClientes() {
    this.telefonoService.listarClientes().subscribe({
      next: (data) => this.clientes = data,
      error: (err) => console.log(err.message)
    });
  }
 
  registrar() {
    if (
      !this.nuevoNumero.trim() ||
      !this.nuevoTipo.trim() ||
      this.nuevoClienteId === 0
    ) return;
 
    const nuevo: TelefonoRequestModel = {
      id: 0,
      numero: this.nuevoNumero,
      tipo: this.nuevoTipo,
      cliente: { id: this.nuevoClienteId }
    };
 
    this.telefonoService.crear(nuevo).subscribe({
      next: () => {
        this.nuevoNumero = '';
        this.nuevoTipo = '';
        this.nuevoClienteId = 0;
        this.cargarLista();
      },
      error: (err) => console.log(err.message)
    });
  }
 
  iniciarEdicion(item: TelefonoModel) {
    this.editandoId = item.id;
    this.editandoNumero = item.numero;
    this.editandoTipo = item.tipo;
    this.editandoClienteId = item.cliente?.id ?? 0;
  }
 
  guardarEdicion() {
    if (
      this.editandoId === null ||
      !this.editandoNumero.trim() ||
      !this.editandoTipo.trim() ||
      this.editandoClienteId === 0
    ) return;
 
    const actualizado: TelefonoRequestModel = {
      id: this.editandoId,
      numero: this.editandoNumero,
      tipo: this.editandoTipo,
      cliente: { id: this.editandoClienteId }
    };
 
    this.telefonoService.actualizar(this.editandoId, actualizado).subscribe({
      next: () => {
        this.cancelarEdicion();
        this.cargarLista();
      },
      error: (err) => console.log(err.message)
    });
  }
 
  cancelarEdicion() {
    this.editandoId = null;
    this.editandoNumero = '';
    this.editandoTipo = '';
    this.editandoClienteId = 0;
  }
 
  eliminar(id: number) {
    this.telefonoService.eliminar(id).subscribe({
      next: () => this.cargarLista(),
      error: (err) => console.log(err.message)
    });
  }
 
  nombreCliente(item: TelefonoModel): string {
    if (!item.cliente) return '—';
    return `${item.cliente.nombre} ${item.cliente.apellido_paterno}`;
  }
}