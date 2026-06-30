import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsetting } from '../Settings/AppSettings';
import { TelefonoModel, TelefonoRequestModel } from '../Models/TelefonoModel';
import { ClienteModel } from '../Models/ClienteModel';
 
@Injectable({
  providedIn: 'root'
})
export class TelefonoService {
  private http = inject(HttpClient);
  private apiUrl = appsetting.apiUrl;
 
  listar() {
    return this.http.get<TelefonoModel[]>(this.apiUrl + 'telefonos');
  }
 
  crear(data: TelefonoRequestModel) {
    return this.http.post<TelefonoModel>(this.apiUrl + 'telefonos', data);
  }
 
  obtenerPorId(id: number) {
    return this.http.get<TelefonoModel>(this.apiUrl + 'telefonos/' + id);
  }
 
  actualizar(id: number, data: TelefonoRequestModel) {
    return this.http.put<TelefonoModel>(this.apiUrl + 'telefonos/' + id, data);
  }
 
  eliminar(id: number) {
    return this.http.delete(this.apiUrl + 'telefonos/' + id);
  }
 
  listarClientes() {
    return this.http.get<ClienteModel[]>(this.apiUrl + 'clientes');
  }

  listarPorCliente(idCliente: number) {
    return this.http.get<TelefonoModel[]>(this.apiUrl + 'telefonos/cliente/' + idCliente);
  }
}