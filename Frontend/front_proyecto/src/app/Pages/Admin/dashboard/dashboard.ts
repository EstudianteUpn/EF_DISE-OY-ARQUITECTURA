import { CommonModule } from '@angular/common';
import { Component, inject, signal, computed } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import { PedidoService } from '../../../Services/PedidoService';
import { DetallePedidoService } from '../../../Services/DetallePedidoService';
import { StockService } from '../../../Services/StockService';
import { PedidoModel } from '../../../Models/PedidoModel';
import { DetallePedidoModel } from '../../../Models/DetallePedidoModel';
import { StockModel } from '../../../Models/StockModel';

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
               'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private pedidoService = inject(PedidoService);
  private detallePedidoService = inject(DetallePedidoService);
  private stockService = inject(StockService);

  pedidos = signal<PedidoModel[]>([]);
  detalles = signal<DetallePedidoModel[]>([]);
  stockItems = signal<StockModel[]>([]);

  graficaVentasMes = signal<any>({});
  graficaProductos = signal<any>({});

  mesSeleccionado = signal<string>('');
  pedidosDelMes = signal<PedidoModel[]>([]);
  mostrarDetalle = signal<boolean>(false);

  stockBajo = computed(() =>
    this.stockItems().filter(s => s.cantidad <= s.stock_minimo)
  );

  totalVentasMes = computed(() => {
    const mesActual = new Date().getMonth();
    return this.pedidos()
      .filter(p => new Date(p.fecha_creacion).getMonth() === mesActual)
      .reduce((sum, p) => sum + p.total, 0);
  });

  totalPedidosMes = computed(() => {
    const mesActual = new Date().getMonth();
    return this.pedidos()
      .filter(p => new Date(p.fecha_creacion).getMonth() === mesActual)
      .length;
  });

  constructor() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.pedidoService.listar().subscribe({
      next: (data) => {
        this.pedidos.set(data);
        this.configurarGraficaVentasMes();
      },
      error: (err) => console.error('Error al cargar pedidos', err)
    });

    this.detallePedidoService.listar().subscribe({
      next: (data) => {
        this.detalles.set(data);
        this.configurarGraficaProductos();
      },
      error: (err) => console.error('Error al cargar detalles', err)
    });

    this.stockService.listar().subscribe({
      next: (data) => {
        this.stockItems.set(data);
      },
      error: (err) => console.error('Error al cargar stock', err)
    });
  }

  configurarGraficaVentasMes() {
    const ventasPorMes: { [key: string]: number } = {};

    this.pedidos().forEach(pedido => {
      const fecha = new Date(pedido.fecha_creacion);
      const mesLabel = MESES[fecha.getMonth()];
      ventasPorMes[mesLabel] = (ventasPorMes[mesLabel] || 0) + pedido.total;
    });

    const meses = Object.keys(ventasPorMes);
    const valores = Object.values(ventasPorMes);

    this.graficaVentasMes.set({
      title: { text: 'Ventas por mes', left: 'center', textStyle: { fontFamily: 'Inter, sans-serif', fontWeight: '600', fontSize: 15 } },
      tooltip: { trigger: 'axis', formatter: (p: any) => `${p[0].name}<br/>S/ ${p[0].value.toFixed(2)}` },
      xAxis: { data: meses, axisLabel: { fontFamily: 'Inter, sans-serif' } },
      yAxis: { axisLabel: { formatter: 'S/ {value}', fontFamily: 'Inter, sans-serif' } },
      series: [{
        type: 'bar',
        data: valores,
        itemStyle: { color: '#4F7CFF', borderRadius: [6, 6, 0, 0] },
        emphasis: { itemStyle: { color: '#2B5CE6' } },
        label: { show: true, position: 'top', formatter: 'S/ {c}', color: '#374151', fontFamily: 'Inter, sans-serif', fontSize: 11 }
      }]
    });
  }

  alClickVentasMes(event: any) {
    this.mesSeleccionado.set(event.name);
    const idxMes = MESES.indexOf(event.name);

    this.pedidosDelMes.set(
      this.pedidos().filter(p => new Date(p.fecha_creacion).getMonth() === idxMes)
    );
    this.mostrarDetalle.set(true);
  }

  cerrarDetalle() {
    this.mostrarDetalle.set(false);
    this.mesSeleccionado.set('');
    this.pedidosDelMes.set([]);
  }

  configurarGraficaProductos() {
    const cantidadPorProducto: { [key: string]: number } = {};

    this.detalles().forEach(d => {
      const nombre = d.producto?.nombre || 'Desconocido';
      cantidadPorProducto[nombre] = (cantidadPorProducto[nombre] || 0) + d.cantidad;
    });

    const sorted = Object.entries(cantidadPorProducto)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    const nombres = sorted.map(e => e[0]);
    const cantidades = sorted.map(e => e[1]);

    this.graficaProductos.set({
      title: { text: 'Productos más vendidos', left: 'center', textStyle: { fontFamily: 'Inter, sans-serif', fontWeight: '600', fontSize: 15 } },
      tooltip: { trigger: 'axis', formatter: (p: any) => `${p[0].name}<br/>${p[0].value} unid.` },
      xAxis: { type: 'value', axisLabel: { fontFamily: 'Inter, sans-serif' } },
      yAxis: { type: 'category', data: nombres, axisLabel: { fontFamily: 'Inter, sans-serif', fontSize: 11 } },
      grid: { left: '3%', right: '8%', containLabel: true },
      series: [{
        type: 'bar',
        data: cantidades,
        itemStyle: { color: '#10B981', borderRadius: [0, 6, 6, 0] },
        emphasis: { itemStyle: { color: '#059669' } },
        label: { show: true, position: 'right', formatter: '{c} unid.', color: '#374151', fontFamily: 'Inter, sans-serif', fontSize: 11 }
      }]
    });
  }

  getNivelStock(item: StockModel): string {
    if (item.cantidad === 0) return 'agotado';
    if (item.cantidad <= item.stock_minimo) return 'bajo';
    return 'ok';
  }
}