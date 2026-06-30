import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsetting } from '../Settings/AppSettings';
import { CategoriaProductoModel } from '../Models/CategoriaProductoModel';

@Injectable({ providedIn: 'root' })
export class CategoriaProductoService {
  private http = inject(HttpClient);
  private apiUrl = appsetting.apiUrl;

  listar() {
    return this.http.get<CategoriaProductoModel[]>(this.apiUrl + 'categoria_productos');
  }

  crear(data: CategoriaProductoModel) {
    return this.http.post<CategoriaProductoModel>(this.apiUrl + 'categoria_productos', data);
  }

  actualizar(id: number, data: CategoriaProductoModel) {
    return this.http.put<CategoriaProductoModel>(this.apiUrl + 'categoria_productos/' + id, data);
  }

  eliminar(id: number) {
    return this.http.delete(this.apiUrl + 'categoria_productos/' + id);
  }
}