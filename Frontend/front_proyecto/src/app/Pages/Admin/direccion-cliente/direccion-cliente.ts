import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DireccionClienteService } from '../../../Services/DireccionClienteService';
import { DireccionClienteModel, DireccionClienteRequestModel } from '../../../Models/DireccionClienteModel';
import { ClienteModel } from '../../../Models/ClienteModel';
 
@Component({
  selector: 'app-direccion-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './direccion-cliente.html',
  styleUrl: './direccion-cliente.css'
})
export class DireccionCliente implements OnInit {
  private direccionService = inject(DireccionClienteService);
 
  lista: DireccionClienteModel[] = [];
  clientes: ClienteModel[] = [];
 
  nuevoNombre: string = '';
  nuevoDistrito: string = '';
  nuevaDireccion: string = '';
  nuevoCodigoPostal: string = '';
  nuevoDepartamento: string = '';
  nuevaCiudad: string = '';
  nuevoEsPrincipal: boolean = false;
  nuevoClienteId: number = 0;
 
  editandoId: number | null = null;
  editandoNombre: string = '';
  editandoDistrito: string = '';
  editandoDireccion: string = '';
  editandoCodigoPostal: string = '';
  editandoDepartamento: string = '';
  editandoCiudad: string = '';
  editandoEsPrincipal: boolean = false;
  editandoClienteId: number = 0;
 
  ngOnInit() {
    this.cargarLista();
    this.cargarClientes();
  }
 
  cargarLista() {
    this.direccionService.listar().subscribe({
      next: (data) => this.lista = data,
      error: (err) => console.log(err.message)
    });
  }
 
  cargarClientes() {
    this.direccionService.listarClientes().subscribe({
      next: (data) => this.clientes = data,
      error: (err) => console.log(err.message)
    });
  }
 
  registrar() {
    if (
      !this.nuevoNombre.trim() ||
      !this.nuevoDistrito.trim() ||
      !this.nuevaDireccion.trim() ||
      !this.nuevoDepartamento.trim() ||
      !this.nuevaCiudad.trim() ||
      this.nuevoClienteId === 0
    ) return;
 
    const nuevo: DireccionClienteRequestModel = {
      id: 0,
      nombre: this.nuevoNombre,
      distrito: this.nuevoDistrito,
      direccion: this.nuevaDireccion,
      codigo_postal: this.nuevoCodigoPostal,
      departamento: this.nuevoDepartamento,
      ciudad: this.nuevaCiudad,
      es_principal: this.nuevoEsPrincipal,
      cliente: { id: this.nuevoClienteId }
    };
 
    this.direccionService.crear(nuevo).subscribe({
      next: () => {
        this.nuevoNombre = '';
        this.nuevoDistrito = '';
        this.nuevaDireccion = '';
        this.nuevoCodigoPostal = '';
        this.nuevoDepartamento = '';
        this.nuevaCiudad = '';
        this.nuevoEsPrincipal = false;
        this.nuevoClienteId = 0;
        this.cargarLista();
      },
      error: (err) => console.log(err.message)
    });
  }
 
  iniciarEdicion(item: DireccionClienteModel) {
    this.editandoId = item.id;
    this.editandoNombre = item.nombre;
    this.editandoDistrito = item.distrito;
    this.editandoDireccion = item.direccion;
    this.editandoCodigoPostal = item.codigo_postal;
    this.editandoDepartamento = item.departamento;
    this.editandoCiudad = item.ciudad;
    this.editandoEsPrincipal = item.es_principal;
    this.editandoClienteId = item.cliente?.id ?? 0;
  }
 
  guardarEdicion() {
    if (
      this.editandoId === null ||
      !this.editandoNombre.trim() ||
      !this.editandoDistrito.trim() ||
      !this.editandoDireccion.trim() ||
      !this.editandoDepartamento.trim() ||
      !this.editandoCiudad.trim() ||
      this.editandoClienteId === 0
    ) return;
 
    const actualizado: DireccionClienteRequestModel = {
      id: this.editandoId,
      nombre: this.editandoNombre,
      distrito: this.editandoDistrito,
      direccion: this.editandoDireccion,
      codigo_postal: this.editandoCodigoPostal,
      departamento: this.editandoDepartamento,
      ciudad: this.editandoCiudad,
      es_principal: this.editandoEsPrincipal,
      cliente: { id: this.editandoClienteId }
    };
 
    this.direccionService.actualizar(this.editandoId, actualizado).subscribe({
      next: () => {
        this.cancelarEdicion();
        this.cargarLista();
      },
      error: (err) => console.log(err.message)
    });
  }
 
  cancelarEdicion() {
    this.editandoId = null;
    this.editandoNombre = '';
    this.editandoDistrito = '';
    this.editandoDireccion = '';
    this.editandoCodigoPostal = '';
    this.editandoDepartamento = '';
    this.editandoCiudad = '';
    this.editandoEsPrincipal = false;
    this.editandoClienteId = 0;
  }
 
  eliminar(id: number) {
    this.direccionService.eliminar(id).subscribe({
      next: () => this.cargarLista(),
      error: (err) => console.log(err.message)
    });
  }
 
  nombreCliente(item: DireccionClienteModel): string {
    if (!item.cliente) return '—';
    return `${item.cliente.nombre} ${item.cliente.apellido_paterno}`;
  }
}