import { Injectable, signal, computed } from '@angular/core';
import { ProductoModel } from '../Models/ProductosModels';

export interface ItemCarrito {
  producto: ProductoModel;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private items = signal<ItemCarrito[]>([]);

  carrito = this.items.asReadonly();

  total = computed(() =>
    this.items().reduce((sum, i) => sum + i.producto.precio * i.cantidad, 0)
  );

  cantidadTotal = computed(() =>
    this.items().reduce((sum, i) => sum + i.cantidad, 0)
  );

  agregar(producto: ProductoModel) {
    const actual = this.items();
    const idx = actual.findIndex(i => i.producto.id === producto.id);
    if (idx >= 0) {
      const copia = [...actual];
      copia[idx] = { ...copia[idx], cantidad: copia[idx].cantidad + 1 };
      this.items.set(copia);
    } else {
      this.items.set([...actual, { producto, cantidad: 1 }]);
    }
  }

  quitar(productoId: number) {
    this.items.set(this.items().filter(i => i.producto.id !== productoId));
  }

  cambiarCantidad(productoId: number, cantidad: number) {
    if (cantidad <= 0) { this.quitar(productoId); return; }
    this.items.set(this.items().map(i =>
      i.producto.id === productoId ? { ...i, cantidad } : i
    ));
  }

  limpiar() {
    this.items.set([]);
  }
}