import { Component, inject, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../Services/ProductoService';
import { CategoriaProductoService } from '../../Services/CategoriaProductoService';
import { StockService } from '../../Services/StockService';
import { CatalogosService } from '../../Services/catalogosService';
import { ProductoModel, ProductoRequestModel } from '../../Models/ProductosModels';
import { CategoriaProductoModel } from '../../Models/CategoriaProductoModel';
import { StockModel, StockRequestModel } from '../../Models/StockModel';
import { CatalogoModel } from '../../Models/CatalogoModel';

type Tab = 'productos' | 'categorias' | 'estados' | 'stock';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class Producto implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private productoService = inject(ProductoService);
  private categoriaService = inject(CategoriaProductoService);
  private stockService = inject(StockService);
  private catalogosService = inject(CatalogosService);

  tabActivo = signal<Tab>('productos');

  cambiarTab(tab: Tab) {
    this.tabActivo.set(tab);
    this.resetForms();
  }

  estados: CatalogoModel[] = [];
  categorias: CategoriaProductoModel[] = [];

  listaProductos: ProductoModel[] = [];
  busquedaProducto = '';

  get productosFiltrados() {
    const q = this.busquedaProducto.toLowerCase();
    return q ? this.listaProductos.filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      p.descripcion?.toLowerCase().includes(q)
    ) : this.listaProductos;
  }

  nuevoNombre = '';
  nuevoDescripcion = '';
  nuevoPrecio: number = 0;
  nuevoDescuento: number = 0;
  nuevoImagenUrl = '';
  nuevoEstadoId: number = 0;
  nuevoCategoriaId: number = 0;

  editandoProductoId: number | null = null;
  editandoNombre = '';
  editandoDescripcion = '';
  editandoPrecio: number = 0;
  editandoDescuento: number = 0;
  editandoImagenUrl = '';
  editandoEstadoId: number = 0;
  editandoCategoriaId: number = 0;

  listaCategorias: CategoriaProductoModel[] = [];

  nuevoCatNombre = '';
  nuevoCatTipo = '';

  editandoCatId: number | null = null;
  editandoCatNombre = '';
  editandoCatTipo = '';

  listaEstados: CatalogoModel[] = [];

  nuevoEstadoNombre = '';

  editandoEstId: number | null = null;
  editandoEstNombre = '';

  listaStock: StockModel[] = [];
  productosParaStock: ProductoModel[] = [];
  busquedaStock = '';

  get stockFiltrado() {
    const q = this.busquedaStock.toLowerCase();
    return q ? this.listaStock.filter(s =>
      s.producto?.nombre.toLowerCase().includes(q)
    ) : this.listaStock;
  }

  nuevoStockProductoId: number = 0;
  nuevaCantidad: number = 0;
  nuevoStockMinimo: number = 0;

  editandoStockId: number | null = null;
  editandoStockProductoId: number = 0;
  editandoCantidad: number = 0;
  editandoStockMinimo: number = 0;

  ngOnInit() {
    this.cargarTodo();
  }

  cargarTodo() {
    this.cargarProductos();
    this.cargarCategorias();
    this.cargarEstados();
    this.cargarStock();
  }

  cargarProductos() {
    this.productoService.listar().subscribe({
      next: d => {
        this.listaProductos = d;
        this.cdr.detectChanges(); 
      },
      error: e => console.error(e)
    });
  }

  cargarCategorias() {
  this.categoriaService.listar().subscribe({
    next: d => {
      this.listaCategorias = d;
      this.categorias = d;
      this.cdr.detectChanges();
    },
    error: e => console.error(e)
  });
  }

  cargarEstados() {
    this.catalogosService.listarEstadosProducto().subscribe({
      next: d => {
        this.listaEstados = d;
        this.estados = d;
        this.cdr.detectChanges();
      },
      error: e => console.error(e)
    });
  }

  cargarStock() {
    this.stockService.listar().subscribe({
      next: d => { this.listaStock = d; this.cdr.detectChanges(); },
      error: e => console.error(e)
    });
    this.stockService.listarProductos().subscribe({
      next: d => { this.productosParaStock = d; this.cdr.detectChanges(); },
      error: e => console.error(e)
    });
  }

  registrarProducto() {
    if (!this.nuevoNombre.trim() || this.nuevoPrecio <= 0 ||
        this.nuevoEstadoId === 0 || this.nuevoCategoriaId === 0) return;

    const nuevo: ProductoRequestModel = {
      id: 0,
      nombre: this.nuevoNombre,
      descripcion: this.nuevoDescripcion,
      precio: this.nuevoPrecio,
      descuento: this.nuevoDescuento,
      imagen_url: this.nuevoImagenUrl,
      estado: { id: this.nuevoEstadoId },
      categoria: { id: this.nuevoCategoriaId }
    };

    this.productoService.crear(nuevo).subscribe({
      next: () => { 
        this.resetNuevoProducto(); 
        this.editandoProductoId = null;
        this.cargarProductos(); 
      },
      error: e => console.error(e)
    });
  }

  iniciarEdicionProducto(item: ProductoModel) {
    this.editandoProductoId = item.id;
    this.editandoNombre = item.nombre;
    this.editandoDescripcion = item.descripcion;
    this.editandoPrecio = item.precio;
    this.editandoDescuento = item.descuento;
    this.editandoImagenUrl = item.imagen_url;
    this.editandoEstadoId = item.estado?.id ?? 0;
    this.editandoCategoriaId = item.categoria?.id ?? 0;
  }

  guardarEdicionProducto() {
    if (!this.editandoNombre.trim() || this.editandoPrecio <= 0 ||
        this.editandoEstadoId === 0 || this.editandoCategoriaId === 0 ||
        this.editandoProductoId === null) return;

    const actualizado: ProductoRequestModel = {
      id: this.editandoProductoId,
      nombre: this.editandoNombre,
      descripcion: this.editandoDescripcion,
      precio: this.editandoPrecio,
      descuento: this.editandoDescuento,
      imagen_url: this.editandoImagenUrl,
      estado: { id: this.editandoEstadoId },
      categoria: { id: this.editandoCategoriaId }
    };

    this.productoService.actualizar(this.editandoProductoId, actualizado).subscribe({
      next: () => { this.cancelarEdicionProducto(); this.cargarProductos(); },
      error: e => console.error(e)
    });
  }

  cancelarEdicionProducto() {
    this.editandoProductoId = null;
    this.editandoNombre = '';
    this.editandoDescripcion = '';
    this.editandoPrecio = 0;
    this.editandoDescuento = 0;
    this.editandoImagenUrl = '';
    this.editandoEstadoId = 0;
    this.editandoCategoriaId = 0;
  }

  eliminarProducto(id: number) {
    if (!confirm('¿Eliminar este producto?')) return;
    this.productoService.eliminar(id).subscribe({
      next: () => this.cargarProductos(),
      error: e => console.error(e)
    });
  }

  registrarCategoria() {
    if (!this.nuevoCatNombre.trim() || !this.nuevoCatTipo.trim()) return;
    const nuevo: CategoriaProductoModel = { id: 0, nombre: this.nuevoCatNombre, tipo_general: this.nuevoCatTipo };
    this.categoriaService.crear(nuevo).subscribe({
      next: () => { this.nuevoCatNombre = ''; this.nuevoCatTipo = ''; this.cargarCategorias(); },
      error: e => console.error(e)
    });
  }

  iniciarEdicionCat(item: CategoriaProductoModel) {
    this.editandoCatId = item.id;
    this.editandoCatNombre = item.nombre;
    this.editandoCatTipo = item.tipo_general;
  }

  guardarEdicionCat() {
    if (!this.editandoCatNombre.trim() || !this.editandoCatTipo.trim() || this.editandoCatId === null) return;
    const actualizado: CategoriaProductoModel = { id: this.editandoCatId, nombre: this.editandoCatNombre, tipo_general: this.editandoCatTipo };
    this.categoriaService.actualizar(this.editandoCatId, actualizado).subscribe({
      next: () => { this.editandoCatId = null; this.editandoCatNombre = ''; this.editandoCatTipo = ''; this.cargarCategorias(); },
      error: e => console.error(e)
    });
  }

  cancelarEdicionCat() { this.editandoCatId = null; this.editandoCatNombre = ''; this.editandoCatTipo = ''; }

  eliminarCategoria(id: number) {
    if (!confirm('¿Eliminar esta categoría?')) return;
    this.categoriaService.eliminar(id).subscribe({
      next: () => this.cargarCategorias(),
      error: e => console.error(e)
    });
  }

  registrarEstado() {
    if (!this.nuevoEstadoNombre.trim()) return;
    const nuevo: CatalogoModel = { id: 0, nombre: this.nuevoEstadoNombre };
    this.catalogosService.crearEstadoProducto(nuevo).subscribe({
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
    this.catalogosService.actualizarEstadoProducto(this.editandoEstId, actualizado).subscribe({
      next: () => { this.editandoEstId = null; this.editandoEstNombre = ''; this.cargarEstados(); },
      error: e => console.error(e)
    });
  }

  cancelarEdicionEst() { this.editandoEstId = null; this.editandoEstNombre = ''; }

  eliminarEstado(id: number) {
    if (!confirm('¿Eliminar este estado?')) return;
    this.catalogosService.eliminarEstadoProducto(id).subscribe({
      next: () => this.cargarEstados(),
      error: e => console.error(e)
    });
  }

  registrarStock() {
    if (this.nuevoStockProductoId === 0 || this.nuevaCantidad < 0) return;

    const stockExistente = this.listaStock.find(
      s => s.producto?.id === +this.nuevoStockProductoId
    );

    if (stockExistente) {
     
      const actualizado: StockRequestModel = {
        id: stockExistente.id,
        cantidad: stockExistente.cantidad + this.nuevaCantidad,
        stock_minimo: this.nuevoStockMinimo > 0
          ? this.nuevoStockMinimo          
          : stockExistente.stock_minimo,  
        producto: { id: this.nuevoStockProductoId }
      };

      this.stockService.actualizar(stockExistente.id, actualizado).subscribe({
        next: () => {
          this.nuevoStockProductoId = 0;
          this.nuevaCantidad = 0;
          this.nuevoStockMinimo = 0;
          this.cargarStock();
          this.cdr.detectChanges();
        },
        error: e => console.error(e)
      });

    } else {
    
      const nuevo: StockRequestModel = {
        id: 0,
        cantidad: this.nuevaCantidad,
        stock_minimo: this.nuevoStockMinimo,
        producto: { id: this.nuevoStockProductoId }
      };

      this.stockService.crear(nuevo).subscribe({
        next: () => {
          this.nuevoStockProductoId = 0;
          this.nuevaCantidad = 0;
          this.nuevoStockMinimo = 0;
          this.cargarStock();
          this.cdr.detectChanges();
        },
        error: e => console.error(e)
      });
    }
  }

  iniciarEdicionStock(item: StockModel) {
    this.editandoStockId = item.id;
    this.editandoStockProductoId = item.producto?.id ?? 0;
    this.editandoCantidad = item.cantidad;
    this.editandoStockMinimo = item.stock_minimo;
  }

  guardarEdicionStock() {
    if (this.editandoStockId === null || this.editandoStockProductoId === 0) return;
    const actualizado: StockRequestModel = {
      id: this.editandoStockId,
      cantidad: this.editandoCantidad,
      stock_minimo: this.editandoStockMinimo,
      producto: { id: this.editandoStockProductoId }
    };
    this.stockService.actualizar(this.editandoStockId, actualizado).subscribe({
      next: () => { this.cancelarEdicionStock(); this.cargarStock(); },
      error: e => console.error(e)
    });
  }

  cancelarEdicionStock() { this.editandoStockId = null; this.editandoStockProductoId = 0; this.editandoCantidad = 0; this.editandoStockMinimo = 0; }

  eliminarStock(id: number) {
    if (!confirm('¿Eliminar este registro de stock?')) return;
    this.stockService.eliminar(id).subscribe({
      next: () => this.cargarStock(),
      error: e => console.error(e)
    });
  }

  nivelStock(item: StockModel): 'agotado' | 'bajo' | 'ok' {
    if (item.cantidad === 0) return 'agotado';
    if (item.cantidad <= item.stock_minimo) return 'bajo';
    return 'ok';
  }

  private resetNuevoProducto() {
    this.nuevoNombre = ''; this.nuevoDescripcion = ''; this.nuevoPrecio = 0;
    this.nuevoDescuento = 0; this.nuevoImagenUrl = ''; this.nuevoEstadoId = 0; this.nuevoCategoriaId = 0;
  }

  private resetForms() {
    this.cancelarEdicionProducto();
    this.cancelarEdicionCat();
    this.cancelarEdicionEst();
    this.cancelarEdicionStock();
    this.busquedaProducto = '';
    this.busquedaStock = '';
  }

  get modalAbierto(): boolean { return this.editandoProductoId !== null; }
}