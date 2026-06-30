import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransaccionService } from '../../Services/TransaccionService';
import { TransaccionModel } from '../../Models/TransaccionModel';

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transacciones.html',
  styleUrl: './transacciones.css'
})
export class Transacciones implements OnInit {
  private transaccionService = inject(TransaccionService);
  private cdr = inject(ChangeDetectorRef);

  transacciones: TransaccionModel[] = [];

  busquedaTransaccion = '';
  filtroEstadoTexto = '';

  transaccionSeleccionada: TransaccionModel | null = null;

  ngOnInit() {
    this.cargarTransacciones();
  }

  cargarTransacciones() {
    this.transaccionService.listar().subscribe({
      next: (data) => {
        console.log('TRANSACCIONES RECIBIDAS:', data);
        this.transacciones = data;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error al listar transacciones:', err)
    });
  }

  abrirVerTransaccion(t: TransaccionModel) {
    this.transaccionSeleccionada = t;
    this.cdr.markForCheck();
  }

  cerrarModalTransaccion() {
    this.transaccionSeleccionada = null;
    this.cdr.markForCheck();
  }

  get transaccionesFiltradas(): TransaccionModel[] {
    const texto = this.busquedaTransaccion.toLowerCase();
    return this.transacciones.filter(t => {
      const coincideBusqueda = !texto ||
        t.id?.toString().includes(texto) ||
        t.pago?.id?.toString().includes(texto) ||
        t.codigo_transaccion?.toLowerCase().includes(texto) ||
        t.numero_operacion?.toLowerCase().includes(texto);

      const coincideEstado = !this.filtroEstadoTexto || t.estado_transaccion === this.filtroEstadoTexto;

      return coincideBusqueda && coincideEstado;
    });
  }

  get estadosDisponibles(): string[] {
    const set = new Set(this.transacciones.map(t => t.estado_transaccion).filter(Boolean));
    return Array.from(set);
  }

  claseEstado(nombre: string | undefined): string {
    const n = (nombre || '').toLowerCase();
    if (n.includes('aprobada') || n.includes('aprobado') || n.includes('completado')) return 'ped-badge--verde';
    if (n.includes('pendiente')) return 'ped-badge--amarillo';
    if (n.includes('rechazada') || n.includes('rechazado') || n.includes('cancelado')) return 'ped-badge--rojo';
    return 'ped-badge--azul';
  }
}