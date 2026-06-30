import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsetting } from '../Settings/AppSettings';
import { StockModel, StockRequestModel } from '../Models/StockModel';
import { ProductoModel } from '../Models/ProductosModels';
 
@Injectable({
  providedIn: 'root'
})
export class StockService {
  private http = inject(HttpClient);
  private apiUrl = appsetting.apiUrl;
 
  listar() {
    return this.http.get<StockModel[]>(this.apiUrl + 'stock');
  }
 
  crear(data: StockRequestModel) {
    return this.http.post<StockModel>(this.apiUrl + 'stock', data);
  }
 
  obtenerPorId(id: number) {
    return this.http.get<StockModel>(this.apiUrl + 'stock/' + id);
  }
 
  actualizar(id: number, data: StockRequestModel) {
    return this.http.put<StockModel>(this.apiUrl + 'stock/' + id, data);
  }
 
  eliminar(id: number) {
    return this.http.delete(this.apiUrl + 'stock/' + id);
  }

  listarProductos() {
    return this.http.get<ProductoModel[]>(this.apiUrl + 'productos');
  }
}