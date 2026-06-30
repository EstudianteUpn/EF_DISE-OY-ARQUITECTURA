import { Component, inject, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarritoService } from '../../Services/CarritoService';
import { AuthService } from '../../Services/AuthService';
import { ClienteService } from '../../Services/ClienteService';
import { PedidoService } from '../../Services/PedidoService';
import { DetallePedidoService } from '../../Services/DetallePedidoService';
import { DireccionClienteService } from '../../Services/DireccionClienteService';
import { ClienteModel } from '../../Models/ClienteModel';
import { DireccionClienteModel, DireccionClienteRequestModel } from '../../Models/DireccionClienteModel';
import { forkJoin } from 'rxjs';
import { TipoEntregaService } from '../../Services/TipoEntregaService';
import { CatalogoModel } from '../../Models/CatalogoModel';
import { TipoPagoService } from '../../Services/TipoPagoService';
import { NiubizService } from '../../Services/NiubizService';

import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {
  private carritoService = inject(CarritoService);
  private authService = inject(AuthService);
  private clienteService = inject(ClienteService);
  private pedidoService = inject(PedidoService);
  private detallePedidoService = inject(DetallePedidoService);
  private direccionService = inject(DireccionClienteService);
  private tipoEntregaService = inject(TipoEntregaService);
  private tipoPagoService = inject(TipoPagoService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private niubizService = inject(NiubizService);

  cliente: ClienteModel | null = null;
  usuarioId: number | null = null;
  procesando = false;
  error = '';

  carrito = this.carritoService.carrito;
  total = this.carritoService.total;

  tiposEntrega: CatalogoModel[] = [];
  tipoEntregaId: number | null = null;

  tiposPago: CatalogoModel[] = [];
  tipoPagoId: number | null = null;


  direccionesGuardadas: DireccionClienteModel[] = [];
  direccionSeleccionadaId: number | null = null;

  mostrarFormDireccion = false;
  nuevaDireccion: DireccionClienteRequestModel = this.direccionVacia();

  mostrandoNiubiz = false;

  ngOnInit() {
    const email = this.obtenerEmailDelToken();
    if (!email) { this.router.navigate(['/login']); return; }

    this.tipoEntregaService.listar().subscribe({
      next: (tipos) => {
        this.tiposEntrega = tipos;
      
        const tienda = tipos.find(t => t.id === 1);
        this.tipoEntregaId = tienda ? tienda.id : (tipos[0]?.id ?? null);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('ERROR tipo entrega:', err);
        this.error = 'No se pudo cargar el tipo de entrega.';
      }
    });

    this.tipoPagoService.listar().subscribe({
      next: (tipos) => {    
        this.tiposPago = tipos;
        this.tipoPagoId = tipos[0]?.id ?? null;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('ERROR tipo pago:', err);
        this.error = 'No se pudo cargar el tipo de pago.';
      }
    });

    this.clienteService.obtenerPorEmail(email).subscribe({
      next: (c) => {
        this.cliente = c;
        this.cargarDireccionesCliente(c.id);
        this.cdr.markForCheck();
      },
      error: () => this.error = 'No se pudo obtener los datos del cliente.'
    });

    this.clienteService.obtenerUsuarioPorEmail(email).subscribe({
      next: (u) => {
        this.usuarioId = u?.id ?? null;
        this.cdr.markForCheck(); 
      },
      error: () => { this.usuarioId = null; this.cdr.markForCheck(); }
    });
  }

  cargarDireccionesCliente(clienteId: number) {
    this.direccionService.listarPorCliente(clienteId).subscribe({
      next: (dirs) => {
        this.direccionesGuardadas = dirs;
        const principal = dirs.find(d => d.es_principal);
        if (principal) this.direccionSeleccionadaId = principal.id;
      },
      error: () => {}
    });
  }

  seleccionarTipoEntrega(id: number) {
    this.tipoEntregaId = id;
    this.mostrarFormDireccion = false;
  }

  seleccionarTipoPago(id: number) {
  this.tipoPagoId = id;
  }

esDelivery(): boolean {

  return this.tipoEntregaId === 2;
}

  toggleFormDireccion() {
    this.mostrarFormDireccion = !this.mostrarFormDireccion;
    if (this.mostrarFormDireccion) this.nuevaDireccion = this.direccionVacia();
  }

  guardarNuevaDireccion() {
    if (!this.cliente) return;
    this.nuevaDireccion.cliente = { id: this.cliente.id };
    this.direccionService.crear(this.nuevaDireccion).subscribe({
      next: (d) => {
        this.direccionesGuardadas.push(d as any);
        this.direccionSeleccionadaId = d.id;
        this.mostrarFormDireccion = false;
      },
      error: () => this.error = 'No se pudo guardar la dirección.'
    });
  }

  esTarjeta(): boolean {
    const tipo = this.tiposPago.find(t => t.id === this.tipoPagoId);
    return tipo?.nombre?.toLowerCase().includes('tarjeta') ?? false;
  }

  iniciarPagoNiubiz(pedidoId: number, monto: number) {
    this.mostrandoNiubiz = true;
    this.cdr.markForCheck(); // 👈 agregar aquí también, antes de la llamada async

    this.niubizService.crearSesion(monto).subscribe({
      next: (sesionResp: any) => {
        console.log('SESION NIUBIZ:', sesionResp);
        const sessionKey = sesionResp.sessionKey;

        const form = document.createElement('form');
        form.action = `http://localhost:8080/api/niubiz/callback?pedidoId=${pedidoId}`;
        form.method = 'POST';

        const script = document.createElement('script');
        script.src = 'https://static-content-qas.vnforapps.com/env/sandbox/js/checkout.js';
        script.setAttribute('data-sessiontoken', sessionKey);
        script.setAttribute('data-channel', 'web');
        script.setAttribute('data-merchantid', '456879852');
        script.setAttribute('data-purchasenumber', pedidoId.toString());
        script.setAttribute('data-amount', monto.toString());
        script.setAttribute('data-expirationminutes', '15');
        script.setAttribute('data-timeouturl', window.location.origin + '/checkout');
        script.setAttribute('data-merchantname', 'Tu Papeleria');

        form.appendChild(script);
        document.getElementById('niubizFormContainer')?.appendChild(form);
      },
      error: (err) => {
        console.error('ERROR AL CREAR SESION NIUBIZ:', err);
        this.procesando = false;
        this.mostrandoNiubiz = false;
        this.error = 'No se pudo iniciar el pago con Niubiz. Revisa la consola.';
        this.cdr.markForCheck(); // 👈 y aquí
      }
    });
  }

  confirmarPedido() {
  if (!this.cliente || this.carrito().length === 0) return;
  if (this.esDelivery() && !this.direccionSeleccionadaId && !this.mostrarFormDireccion) {
    this.error = 'Selecciona o agrega una dirección de entrega.';
    return;
  }
  if (!this.tipoPagoId) {
    this.error = 'Selecciona un tipo de pago.';
    return;
  }
  this.procesando = true;
  this.error = '';

  const pedidoRequest: any = {
    id: 0,
    total: this.total(),
    tipo_venta: 'online',
    estado: { id: 1 },
    cliente: { id: this.cliente.id },
    direccion_cliente: this.esDelivery() && this.direccionSeleccionadaId
      ? { id: this.direccionSeleccionadaId }
      : null,
    usuario: this.usuarioId ? { id: this.usuarioId } : null
  };

  const confirmacionRequest: any = {
    pedido: pedidoRequest,
    tipoEntregaId: this.tipoEntregaId,
    tipoPagoId: this.tipoPagoId
  };

  this.pedidoService.confirmar(confirmacionRequest).subscribe({
      next: (pedidoCreado: any) => {
        const detalles = this.carrito().map(item => {
          const precio = item.producto.precio;
          const igv = +(precio * 0.18).toFixed(2);
          const precioSinIgv = +(precio - igv).toFixed(2);
          const subtotal = +(precio * item.cantidad).toFixed(2);
          return this.detallePedidoService.crear({
            id: 0,
            cantidad: item.cantidad,
            precio_unitario: precio,
            precio_sin_igv: precioSinIgv,
            igv,
            descuento: 0,
            subtotal,
            pedido: { id: pedidoCreado.id },
            producto: { id: item.producto.id }
          });
        });

        forkJoin(detalles).subscribe({
        next: () => {
          if (this.esTarjeta()) {
            this.procesando = false;
            this.iniciarPagoNiubiz(pedidoCreado.id, this.total());
            this.cdr.markForCheck(); // 👈 agregar aquí
            // NO limpiar carrito ni navegar aún
          } else {
            this.carritoService.limpiar();
            this.router.navigate(['/inicio']);
          }
        },
          error: () => {
            this.procesando = false;
            this.error = 'Error al registrar los productos del pedido.';
          }
        });
      },
      error: () => {
        this.procesando = false;
        this.error = 'Error al confirmar el pedido.';
      }
    });
  }

  private obtenerEmailDelToken(): string | null {
    const token = this.authService.getToken();
    if (!token) return null;
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64)).sub;
    } catch { return null; }
  }

  private direccionVacia(): DireccionClienteRequestModel {
    return { id: 0, nombre: '', distrito: '', direccion: '', codigo_postal: '', departamento: '', ciudad: '', es_principal: false, cliente: { id: 0 } };
  }
}