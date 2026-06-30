import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductoService } from '../../Services/ProductoService';
import { ProductoModel } from '../../Models/ProductosModels';
import { CarritoService } from '../../Services/CarritoService';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class Inicio implements OnInit, OnDestroy {
  productos: ProductoModel[] = [];
  productosFiltrados: ProductoModel[] = [];
  categoriaActiva: string = 'Todos';
  cargando: boolean = true;
  error: string = '';

  categorias: string[] = ['Todos'];

  cantidadCarrito: any;

  imagenesCarrusel: string[] = [
    'https://res.cloudinary.com/dreti0loe/image/upload/v1781943070/KEYCAM_CRRSL_2_cqfccy.png',
    'https://res.cloudinary.com/dreti0loe/image/upload/v1781943070/KEYCAM_CRRSL_3_ar9woc.png',
    'https://res.cloudinary.com/dreti0loe/image/upload/v1781943070/KEYCAM_CRRSL_1_omi8zp.png'
  ];
  indiceActivo: number = 0;
  private intervaloCarrusel: any;

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.cantidadCarrito = this.carritoService.cantidadTotal;
    this.cargarProductos();
    this.iniciarCarrusel();
  }

  ngOnDestroy(): void {
    if (this.intervaloCarrusel) {
      clearInterval(this.intervaloCarrusel);
    }
  }

  iniciarCarrusel(): void {
    this.intervaloCarrusel = setInterval(() => {
      this.siguienteImagen();
    }, 1000);
  }

  siguienteImagen(): void {
    this.indiceActivo = (this.indiceActivo + 1) % this.imagenesCarrusel.length;
  }

  irAImagen(i: number): void {
    this.indiceActivo = i;
  }

  cargarProductos(): void {
    this.cargando = true;
    this.error = '';
    this.productoService.listar().subscribe({
      next: (data) => {
        this.productos = data;
        this.productosFiltrados = data;
        this.extraerCategorias(data);
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.error = 'No se pudieron cargar los productos.';
        this.cargando = false;
      }
    });
  }

  extraerCategorias(productos: ProductoModel[]): void {
    const cats = productos
      .map(p => p.categoria.nombre)
      .filter((v, i, a) => a.indexOf(v) === i);
    this.categorias = ['Todos', ...cats];
  }

  filtrarPorCategoria(categoria: string): void {
    this.categoriaActiva = categoria;
    if (categoria === 'Todos') {
      this.productosFiltrados = this.productos;
    } else {
      this.productosFiltrados = this.productos.filter(p => p.categoria.nombre === categoria);
    }
  }

  agregarAlCarrito(producto: ProductoModel): void {
    this.carritoService.agregar(producto);
  }

  getIconoCategoria(categoria: string): string {
    const iconos: { [key: string]: string } = {
      'Todos': 'ti-layout-grid',
      'Papeles': 'ti-file',
      'Impresión': 'ti-printer',
      'Manualidades': 'ti-scissors',
      'Empaques': 'ti-box',
      'Viniles': 'ti-layers-difference',
      'Cartulinas': 'ti-notebook',
    };
    for (const key of Object.keys(iconos)) {
      if (categoria.toLowerCase().includes(key.toLowerCase())) {
        return iconos[key];
      }
    }
    return 'ti-tag';
  }

  getImagenProducto(producto: ProductoModel): string {
    return producto.imagen_url && producto.imagen_url.trim() !== ''
      ? producto.imagen_url
      : '';
  }

  tieneImagen(producto: ProductoModel): boolean {
    return !!(producto.imagen_url && producto.imagen_url.trim() !== '');
  }
}