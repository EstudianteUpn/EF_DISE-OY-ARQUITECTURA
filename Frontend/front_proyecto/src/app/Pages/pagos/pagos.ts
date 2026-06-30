import { Component, inject, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagoService } from '../../Services/PagoService';
import { EstadoPagoService } from '../../Services/EstadoPagoService';
import { TipoPagoService } from '../../Services/TipoPagoService';
import { PagoModel } from '../../Models/PagoModel';
import { CatalogoModel } from '../../Models/CatalogoModel';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagos.html',
  styleUrl: './pagos.css'
})
export class Pagos implements OnInit {
  private pagoService = inject(PagoService);
  private estadoPagoService = inject(EstadoPagoService);
  private tipoPagoService = inject(TipoPagoService);
  private cdr = inject(ChangeDetectorRef); // 👈 agregar

  tabActivo = signal<'pagos' | 'estados' | 'tipos'>('pagos');

  pagos: PagoModel[] = [];
  estadosPago: CatalogoModel[] = [];
  tiposPago: CatalogoModel[] = [];

  busquedaPago = '';
  filtroEstadoId = 0;

  nuevoEstadoNombre = '';
  editandoEstId: number | null = null;
  editandoEstNombre = '';

  nuevoTipoNombre = '';
  editandoTipoId: number | null = null;
  editandoTipoNombre = '';

  pagoSeleccionado: PagoModel | null = null;

  ngOnInit() {
    this.cargarPagos();
    this.cargarEstados();
    this.cargarTipos();
  }

  cambiarTab(tab: 'pagos' | 'estados' | 'tipos') {
    this.tabActivo.set(tab);
  }

  cargarPagos() {
    this.pagoService.listar().subscribe({
      next: (data) => {
        console.log('PAGOS RECIBIDOS:', data); // 👈 deja esto por ahora, te ayuda a revisar fecha_pago
        this.pagos = data;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error al listar pagos:', err)
    });
  }

  cargarEstados() {
    this.estadoPagoService.listar().subscribe({
      next: (data) => {
        this.estadosPago = data;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error al listar estados de pago:', err)
    });
  }

  cargarTipos() {
    this.tipoPagoService.listar().subscribe({
      next: (data) => {
        this.tiposPago = data;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error al listar tipos de pago:', err)
    });
  }

  abrirVerPago(p: PagoModel) {
    this.pagoSeleccionado = p;
    this.cdr.markForCheck(); // 👈 esto resuelve por qué el modal no muestra "estado" hasta hacer clic en otro lado
  }

  cerrarModalPago() {
    this.pagoSeleccionado = null;
    this.cdr.markForCheck();
  }

  registrarEstado() {
    if (!this.nuevoEstadoNombre.trim()) return;
    this.estadoPagoService.crear({ id: 0, nombre: this.nuevoEstadoNombre.trim() }).subscribe({
      next: () => { this.nuevoEstadoNombre = ''; this.cargarEstados(); },
      error: (err) => console.error('Error al crear estado de pago:', err)
    });
  }

  iniciarEdicionEst(e: CatalogoModel) {
    this.editandoEstId = e.id;
    this.editandoEstNombre = e.nombre;
    this.cdr.markForCheck();
  }

  guardarEdicionEst() {
    if (this.editandoEstId === null || !this.editandoEstNombre.trim()) return;
    this.estadoPagoService.actualizar(this.editandoEstId, { id: this.editandoEstId, nombre: this.editandoEstNombre.trim() }).subscribe({
      next: () => { this.editandoEstId = null; this.cargarEstados(); },
      error: (err) => console.error('Error al actualizar estado de pago:', err)
    });
  }

  cancelarEdicionEst() { this.editandoEstId = null; this.cdr.markForCheck(); }

  eliminarEstado(id: number) {
    if (!confirm('¿Eliminar este estado de pago?')) return;
    this.estadoPagoService.eliminar(id).subscribe({
      next: () => this.cargarEstados(),
      error: (err) => console.error('Error al eliminar estado de pago:', err)
    });
  }

  registrarTipo() {
    if (!this.nuevoTipoNombre.trim()) return;
    this.tipoPagoService.crear({ id: 0, nombre: this.nuevoTipoNombre.trim() }).subscribe({
      next: () => { this.nuevoTipoNombre = ''; this.cargarTipos(); },
      error: (err) => console.error('Error al crear tipo de pago:', err)
    });
  }

  iniciarEdicionTipo(t: CatalogoModel) {
    this.editandoTipoId = t.id;
    this.editandoTipoNombre = t.nombre;
    this.cdr.markForCheck();
  }

  guardarEdicionTipo() {
    if (this.editandoTipoId === null || !this.editandoTipoNombre.trim()) return;
    this.tipoPagoService.actualizar(this.editandoTipoId, { id: this.editandoTipoId, nombre: this.editandoTipoNombre.trim() }).subscribe({
      next: () => { this.editandoTipoId = null; this.cargarTipos(); },
      error: (err) => console.error('Error al actualizar tipo de pago:', err)
    });
  }

  cancelarEdicionTipo() { this.editandoTipoId = null; this.cdr.markForCheck(); }

  eliminarTipo(id: number) {
    if (!confirm('¿Eliminar este tipo de pago?')) return;
    this.tipoPagoService.eliminar(id).subscribe({
      next: () => this.cargarTipos(),
      error: (err) => console.error('Error al eliminar tipo de pago:', err)
    });
  }

  get pagosFiltrados(): PagoModel[] {
    const texto = this.busquedaPago.toLowerCase();
    return this.pagos.filter(p => {
      const coincideBusqueda = !texto ||
        p.id?.toString().includes(texto) ||
        p.pedido?.id?.toString().includes(texto) ||
        p.pedido?.cliente?.nombre?.toLowerCase().includes(texto) ||
        p.pedido?.cliente?.apellido_paterno?.toLowerCase().includes(texto) ||
        p.pedido?.cliente?.dni?.includes(texto);

      const coincideEstado = Number(this.filtroEstadoId) === 0 || p.estado?.id === Number(this.filtroEstadoId);

      return coincideBusqueda && coincideEstado;
    });
  }

  claseEstado(nombre: string | undefined): string {
    const n = (nombre || '').toLowerCase();
    if (n.includes('pagado') || n.includes('completado') || n.includes('aprobado')) return 'ped-badge--verde';
    if (n.includes('pendiente')) return 'ped-badge--amarillo';
    if (n.includes('rechazado') || n.includes('cancelado')) return 'ped-badge--rojo';
    return 'ped-badge--azul';
  }
}