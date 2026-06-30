import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsetting } from '../Settings/AppSettings';
import { PedidoModel, PedidoRequestModel } from '../Models/PedidoModel';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private http = inject(HttpClient);
  private apiUrl = appsetting.apiUrl;

  listar() {
    return this.http.get<PedidoModel[]>(this.apiUrl + 'pedido');
  }

  obtenerPorId(id: number) {
    return this.http.get<PedidoModel>(this.apiUrl + 'pedido/' + id);
  }

  crear(data: PedidoRequestModel) {
    return this.http.post<PedidoModel>(this.apiUrl + 'pedido', data);
  }

  actualizar(id: number, data: PedidoRequestModel) {
    return this.http.put<PedidoModel>(this.apiUrl + 'pedido/' + id, data);
  }

  eliminar(id: number) {
    return this.http.delete(this.apiUrl + 'pedido/' + id);
  }

  confirmar(dto: any) {
  return this.http.post<any>(this.apiUrl + 'pedido/confirmar', dto);
  }
}