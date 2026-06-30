import { Component, inject } from '@angular/core';
import { CatalogosService } from '../../../Services/catalogosService';
import { CatalogoModel } from '../../../Models/CatalogoModel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogos',
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogos.html',
  styleUrl: './catalogos.css',
})
export class Catalogos {
  private catalogosService = inject(CatalogosService);

  public lista: CatalogoModel[] = [];
  public catalogoActivo: string = 'roles';

  public nuevoNombre: string = '';
  public editandoId: number | null = null;
  public editandoNombre: string = '';

  constructor() {
    this.cargarCatalogo('roles');
  }

  cargarCatalogo(tipo: string) {
    this.catalogoActivo = tipo;
    this.lista = [];

    const mapa: any = {
      roles: this.catalogosService.listarRoles(),
      estadosUsuario: this.catalogosService.listarEstadosUsuario(),
      estadosProducto: this.catalogosService.listarEstadosProducto(),
      estadosPedido: this.catalogosService.listarEstadosPedido(),
      estadosPago: this.catalogosService.listarEstadosPago(),
      estadosEntrega: this.catalogosService.listarEstadosEntrega(),
      tiposPago: this.catalogosService.listarTiposPago(),
      tiposEntrega: this.catalogosService.listarTiposEntrega(),
      estadosConciliacion: this.catalogosService.listarEstadosConciliacion(),
    };

    mapa[tipo].subscribe({
      next: (data: CatalogoModel[]) => { 
        this.lista = data; 
      },
      error: (err: any) => { 
        console.log(err.message); 
      }
    });
  }

  registrar() {
    if (!this.nuevoNombre.trim()) return;
    const nuevo: CatalogoModel = { id: 0, nombre: this.nuevoNombre };

    const mapa: any = {
      roles: this.catalogosService.crearRol(nuevo),
      estadosUsuario: this.catalogosService.crearEstadoUsuario(nuevo),
      estadosProducto: this.catalogosService.crearEstadoProducto(nuevo),
      estadosPedido: this.catalogosService.crearEstadoPedido(nuevo),
      estadosPago: this.catalogosService.crearEstadoPago(nuevo),
      estadosEntrega: this.catalogosService.crearEstadoEntrega(nuevo),
      tiposPago: this.catalogosService.crearTipoPago(nuevo),
      tiposEntrega: this.catalogosService.crearTipoEntrega(nuevo),
      estadosConciliacion: this.catalogosService.crearEstadoConciliacion(nuevo),
    };

    mapa[this.catalogoActivo].subscribe({
      next: () => {
        this.nuevoNombre = '';
        this.cargarCatalogo(this.catalogoActivo);
      },
      error: (err: any) => { 
        console.log(err.message); 
      }
    });
  }

  iniciarEdicion(item: CatalogoModel) {
    this.editandoId = item.id;
    this.editandoNombre = item.nombre;
  }

  guardarEdicion() {
    if (!this.editandoNombre.trim() || this.editandoId === null) return;
    const actualizado: CatalogoModel = { id: this.editandoId, nombre: this.editandoNombre };

    const mapa: any = {
      roles: this.catalogosService.actualizarRol(this.editandoId, actualizado),
      estadosUsuario: this.catalogosService.actualizarEstadoUsuario(this.editandoId, actualizado),
      estadosProducto: this.catalogosService.actualizarEstadoProducto(this.editandoId, actualizado),
      estadosPedido: this.catalogosService.actualizarEstadoPedido(this.editandoId, actualizado),
      estadosPago: this.catalogosService.actualizarEstadoPago(this.editandoId, actualizado),
      estadosEntrega: this.catalogosService.actualizarEstadoEntrega(this.editandoId, actualizado),
      tiposPago: this.catalogosService.actualizarTipoPago(this.editandoId, actualizado),
      tiposEntrega: this.catalogosService.actualizarTipoEntrega(this.editandoId, actualizado),
      estadosConciliacion: this.catalogosService.actualizarEstadoConciliacion(this.editandoId, actualizado),
    };

    mapa[this.catalogoActivo].subscribe({
      next: () => {
        this.editandoId = null;
        this.editandoNombre = '';
        this.cargarCatalogo(this.catalogoActivo);
      },
      error: (err: any) => { 
        console.log(err.message); 
      }
    });
  }

  cancelarEdicion() {
    this.editandoId = null;
    this.editandoNombre = '';
  }

  eliminar(id: number) {
    const mapa: any = {
      roles: this.catalogosService.eliminarRol(id),
      estadosUsuario: this.catalogosService.eliminarEstadoUsuario(id),
      estadosProducto: this.catalogosService.eliminarEstadoProducto(id),
      estadosPedido: this.catalogosService.eliminarEstadoPedido(id),
      estadosPago: this.catalogosService.eliminarEstadoPago(id),
      estadosEntrega: this.catalogosService.eliminarEstadoEntrega(id),
      tiposPago: this.catalogosService.eliminarTipoPago(id),
      tiposEntrega: this.catalogosService.eliminarTipoEntrega(id),
      estadosConciliacion: this.catalogosService.eliminarEstadoConciliacion(id),
    };

    mapa[this.catalogoActivo].subscribe({
      next: () => { 
        this.cargarCatalogo(this.catalogoActivo); 
      },
      error: (err: any) => { 
        console.log(err.message); 
      }
    });
  }
}