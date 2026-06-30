import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsetting } from '../Settings/AppSettings';
import { ProductoModel, ProductoRequestModel } from '../Models/ProductosModels';
import { CatalogoModel } from '../Models/CatalogoModel';
import { CategoriaProductoModel } from '../Models/CategoriaProductoModel';
 
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject(HttpClient);
  private apiUrl = appsetting.apiUrl;
 
  listar() {
    return this.http.get<ProductoModel[]>(this.apiUrl + 'productos');
  }
 
  crear(data: ProductoRequestModel) {
    return this.http.post<ProductoModel>(this.apiUrl + 'productos', data);
  }
 
  obtenerPorId(id: number) {
    return this.http.get<ProductoModel>(this.apiUrl + 'productos/' + id);
  }
 
  actualizar(id: number, data: ProductoRequestModel) {
    return this.http.put<ProductoModel>(this.apiUrl + 'productos/' + id, data);
  }
 
  eliminar(id: number) {
    return this.http.delete(this.apiUrl + 'productos/' + id);
  }
 
  listarEstados() {
    return this.http.get<CatalogoModel[]>(this.apiUrl + 'estado_productos');
  }

  listarCategorias() {
    return this.http.get<CategoriaProductoModel[]>(this.apiUrl + 'categoria_productos');
  }
}