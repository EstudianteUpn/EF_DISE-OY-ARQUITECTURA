import { Component, inject, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { PedidoService } from '../../Services/PedidoService';
import { DetallePedidoService } from '../../Services/DetallePedidoService';
import { CatalogosService } from '../../Services/catalogosService';

import { PedidoModel, PedidoRequestModel } from '../../Models/PedidoModel';
import { DetallePedidoModel } from '../../Models/DetallePedidoModel';
import { CatalogoModel } from '../../Models/CatalogoModel';

type Tab = 'pedidos' | 'estados';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedido.html',
  styleUrl: './pedido.css',
})
export class Pedido implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private pedidoService = inject(PedidoService);
  private detallePedidoService = inject(DetallePedidoService);
  private catalogosService = inject(CatalogosService);

  tabActivo = signal<Tab>('pedidos');

  cambiarTab(tab: Tab) {
    this.tabActivo.set(tab);
    this.cancelarEdicionEst();
  }

  estadosPedido: CatalogoModel[] = [];

  listaPedidos: PedidoModel[] = [];
  busquedaPedido = '';
  filtroEstadoId = 0;

  get pedidosFiltrados() {
    const q = this.busquedaPedido.toLowerCase().trim();
    return this.listaPedidos.filter(p => {
      const coincideTexto = !q ||
        ('' + p.id).includes(q) ||
        p.cliente?.nombre?.toLowerCase().includes(q) ||
        p.cliente?.apellido_paterno?.toLowerCase().includes(q) ||
        p.cliente?.dni?.toLowerCase().includes(q);
      const coincideEstado = this.filtroEstadoId === 0 || p.estado?.id === this.filtroEstadoId;
      return coincideTexto && coincideEstado;
    });
  }

  pedidoSeleccionado: PedidoModel | null = null;
  detalleVista: DetallePedidoModel[] = [];

  get totalDetalleVista() {
    return this.detalleVista.reduce((acc, it) => acc + it.subtotal, 0);
  }

  ngOnInit() {
    this.cargarTodo();
  }

  cargarTodo() {
    this.cargarPedidos();
    this.cargarEstados();
  }

  cargarPedidos() {
    this.pedidoService.listar().subscribe({
      next: d => {
        this.listaPedidos = d;
        this.cdr.detectChanges();
      },
      error: e => console.error(e)
    });
  }

  cargarEstados() {
    this.catalogosService.listarEstadosPedido().subscribe({
      next: d => {
        this.estadosPedido = d;
        this.cdr.detectChanges();
      },
      error: e => console.error(e)
    });
  }

  abrirVerPedido(p: PedidoModel) {
    this.pedidoSeleccionado = p;
    this.detalleVista = [];
    this.detallePedidoService.listarPorPedido(p.id).subscribe({
      next: d => {
        this.detalleVista = d;
        this.cdr.detectChanges();
      },
      error: e => console.error(e)
    });
  }
  cerrarModal() {
    this.pedidoSeleccionado = null;
    this.detalleVista = [];
  }

  eliminarPedido(id: number) {
    if (!confirm('¿Eliminar este pedido y todos sus detalles?')) return;

    this.detallePedidoService.listar().subscribe({
      next: d => {
        const idsDetalle = d.filter(x => x.pedido?.id === id).map(x => x.id);
        const borrarPedido = () => {
          this.pedidoService.eliminar(id).subscribe({
            next: () => {
              this.cargarPedidos();
              this.cdr.detectChanges(); 
            },
            error: e => console.error(e)
          });
        };
        if (idsDetalle.length === 0) { borrarPedido(); return; }
        const eliminaciones = idsDetalle.map(did => this.detallePedidoService.eliminar(did));
        forkJoin(eliminaciones).subscribe({ next: borrarPedido, error: e => console.error(e) });
      },
      error: e => console.error(e)
    });
  }

  cambiarEstadoRapido(p: PedidoModel, valor: string) {
    const idEstadoNuevo = +valor;
    if (!idEstadoNuevo || idEstadoNuevo === p.estado?.id) return;

    const data: PedidoRequestModel = {
      id: p.id,
      total: p.total,
      tipo_venta: p.tipo_venta,
      estado: { id: idEstadoNuevo },
      cliente: { id: p.cliente.id },
      direccion_cliente: p.direccion_cliente ? { id: p.direccion_cliente.id } : null
    };

    this.pedidoService.actualizar(p.id, data).subscribe({
      next: () => this.cargarPedidos(),
      error: e => console.error(e)
    });
  }

  claseEstado(nombre: string | undefined): string {
    const n = (nombre || '').toLowerCase();
    if (n.includes('cancel')) return 'ped-badge--rojo';
    if (n.includes('entreg') || n.includes('complet') || n.includes('finaliz')) return 'ped-badge--verde';
    if (n.includes('pend')) return 'ped-badge--amarillo';
    return 'ped-badge--azul';
  }

  nuevoEstadoNombre = '';

  editandoEstId: number | null = null;
  editandoEstNombre = '';

  registrarEstado() {
    if (!this.nuevoEstadoNombre.trim()) return;
    const nuevo: CatalogoModel = { id: 0, nombre: this.nuevoEstadoNombre };
    this.catalogosService.crearEstadoPedido(nuevo).subscribe({
      next: () => { this.nuevoEstadoNombre = ''; this.cargarEstados(); },
      error: e => console.error(e)
    });
  }

  iniciarEdicionEst(item: CatalogoModel) {
    this.editandoEstId = item.id;
    this.editandoEstNombre = item.nombre;
  }

  guardarEdicionEst() {
    if (!this.editandoEstNombre.trim() || this.editandoEstId === null) return;
    const actualizado: CatalogoModel = { id: this.editandoEstId, nombre: this.editandoEstNombre };
    this.catalogosService.actualizarEstadoPedido(this.editandoEstId, actualizado).subscribe({
      next: () => { this.cancelarEdicionEst(); this.cargarEstados(); },
      error: e => console.error(e)
    });
  }

  cancelarEdicionEst() {
    this.editandoEstId = null;
    this.editandoEstNombre = '';
  }

  eliminarEstado(id: number) {
    if (!confirm('¿Eliminar este estado? Si hay pedidos usándolo, la eliminación puede fallar.')) return;
    this.catalogosService.eliminarEstadoPedido(id).subscribe({
      next: () => this.cargarEstados(),
      error: e => console.error(e)
    });
  }
}