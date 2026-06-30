import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PedidoService } from '../../Services/PedidoService';
import { StockService } from '../../Services/StockService';
import { PedidoModel } from '../../Models/PedidoModel';
import { StockModel } from '../../Models/StockModel';
import { AuthService } from '../../Services/AuthService';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.css',
})
export class AdminSidebar implements OnInit {
  private pedidoService = inject(PedidoService);
  private stockService = inject(StockService);
  private authService = inject(AuthService);

  pedidos = signal<PedidoModel[]>([]);
  stockItems = signal<StockModel[]>([]);

  pedidosHoy = computed(() => {
    const hoy = new Date();
    return this.pedidos().filter(p => {
      const f = new Date(p.fecha_creacion);
      return f.getDate() === hoy.getDate() &&
             f.getMonth() === hoy.getMonth() &&
             f.getFullYear() === hoy.getFullYear();
    }).length;
  });

  stockCritico = computed(() =>
    this.stockItems().filter(s => s.cantidad <= s.stock_minimo).length
  );

  pedidosRecientes = computed(() =>
    [...this.pedidos()]
      .sort((a, b) => new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime())
      .slice(0, 5)
  );

  nombreUsuario = computed(() => {
    const rol = this.authService.getRol();
    return rol ?? 'Admin';
  });

  ngOnInit() {
    this.pedidoService.listar().subscribe({
      next: data => this.pedidos.set(data),
      error: err => console.error('Error pedidos', err)
    });
    this.stockService.listar().subscribe({
      next: data => this.stockItems.set(data),
      error: err => console.error('Error stock', err)
    });
  }

  logout() {
    this.authService.logout();
  }
}