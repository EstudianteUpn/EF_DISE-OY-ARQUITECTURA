import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsetting } from '../Settings/AppSettings';
import { DireccionClienteModel, DireccionClienteRequestModel } from '../Models/DireccionClienteModel';
import { ClienteModel } from '../Models/ClienteModel';
 
@Injectable({
  providedIn: 'root'
})
export class DireccionClienteService {
  private http = inject(HttpClient);
  private apiUrl = appsetting.apiUrl;
 
  listar() {
    return this.http.get<DireccionClienteModel[]>(this.apiUrl + 'direcciones_cliente');
  }
 
  listarPorCliente(idCliente: number) {
    return this.http.get<DireccionClienteModel[]>(this.apiUrl + 'direcciones_cliente/cliente/' + idCliente);
  }
 
  crear(data: DireccionClienteRequestModel) {
    return this.http.post<DireccionClienteModel>(this.apiUrl + 'direcciones_cliente', data);
  }
 
  obtenerPorId(id: number) {
    return this.http.get<DireccionClienteModel>(this.apiUrl + 'direcciones_cliente/' + id);
  }
 
  actualizar(id: number, data: DireccionClienteRequestModel) {
    return this.http.put<DireccionClienteModel>(this.apiUrl + 'direcciones_cliente/' + id, data);
  }
 
  eliminar(id: number) {
    return this.http.delete(this.apiUrl + 'direcciones_cliente/' + id);
  }
 
  listarClientes() {
    return this.http.get<ClienteModel[]>(this.apiUrl + 'clientes');
  }
}