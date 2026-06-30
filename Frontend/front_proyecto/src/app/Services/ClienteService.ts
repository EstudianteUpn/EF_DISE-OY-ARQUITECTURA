import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsetting } from '../Settings/AppSettings';
import { ClienteModel } from '../Models/ClienteModel';
 
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private http = inject(HttpClient);
  private apiUrl = appsetting.apiUrl;
 
  listar() {
    return this.http.get<ClienteModel[]>(this.apiUrl + 'clientes');
  }
 
  crear(data: ClienteModel) {
    return this.http.post<ClienteModel>(this.apiUrl + 'clientes', data);
  }
 
  obtenerPorId(id: number) {
    return this.http.get<ClienteModel>(this.apiUrl + 'clientes/' + id);
  }
 
  actualizar(id: number, data: ClienteModel) {
    return this.http.put<ClienteModel>(this.apiUrl + 'clientes/' + id, data);
  }
 
  eliminar(id: number) {
    return this.http.delete(this.apiUrl + 'clientes/' + id);
  }

  obtenerPorEmail(email: string) {
    return this.http.get<ClienteModel>(this.apiUrl + 'clientes/email/' + email);
  }

  obtenerUsuarioPorEmail(email: string) {
    return this.http.get<any>(this.apiUrl + 'usuario/email/' + email);
  }
}