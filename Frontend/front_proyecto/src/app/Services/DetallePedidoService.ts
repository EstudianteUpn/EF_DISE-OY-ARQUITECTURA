import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsetting } from '../Settings/AppSettings';
import { DetallePedidoModel, DetallePedidoRequestModel } from '../Models/DetallePedidoModel';

@Injectable({
  providedIn: 'root',
})
export class DetallePedidoService {
  private http = inject(HttpClient);
  private apiUrl = appsetting.apiUrl;

  listar() {
    return this.http.get<DetallePedidoModel[]>(this.apiUrl + 'detalle_pedido');
  }

  obtenerPorId(id: number) {
    return this.http.get<DetallePedidoModel>(this.apiUrl + 'detalle_pedido/' + id);
  }

  crear(data: DetallePedidoRequestModel) {
    return this.http.post<DetallePedidoModel>(this.apiUrl + 'detalle_pedido', data);
  }

  actualizar(id: number, data: DetallePedidoRequestModel) {
    return this.http.put<DetallePedidoModel>(this.apiUrl + 'detalle_pedido/' + id, data);
  }

  eliminar(id: number) {
    return this.http.delete(this.apiUrl + 'detalle_pedido/' + id);
  }

  listarPorPedido(pedidoId: number) {
  return this.http.get<DetallePedidoModel[]>(this.apiUrl + 'detalle_pedido/pedido/' + pedidoId);
  }
}