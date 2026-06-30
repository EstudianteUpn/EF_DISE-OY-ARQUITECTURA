import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsetting } from '../Settings/AppSettings';
import { UsuarioModel, UsuarioRequestModel } from '../Models/UsuarioModel';
import { ClienteModel } from '../Models/ClienteModel';
import { CatalogoModel } from '../Models/CatalogoModel';
 
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http = inject(HttpClient);
  private apiUrl = appsetting.apiUrl;
 
  listar() {
    return this.http.get<UsuarioModel[]>(this.apiUrl + 'usuario');
  }
 
  crear(data: UsuarioRequestModel) {
    return this.http.post<UsuarioModel>(this.apiUrl + 'usuario', data);
  }
 
  obtenerPorId(id: number) {
    return this.http.get<UsuarioModel>(this.apiUrl + 'usuario/' + id);
  }
 
  actualizar(id: number, data: UsuarioRequestModel) {
    return this.http.put<UsuarioModel>(this.apiUrl + 'usuario/' + id, data);
  }
 
  eliminar(id: number) {
    return this.http.delete(this.apiUrl + 'usuario/' + id);
  }
 
  listarClientes() {
    return this.http.get<ClienteModel[]>(this.apiUrl + 'clientes');
  }
 
  listarEstados() {
    return this.http.get<CatalogoModel[]>(this.apiUrl + 'estado_usuarios');
  }
 
  listarRoles() {
    return this.http.get<CatalogoModel[]>(this.apiUrl + 'rol');
  }

  // ===== ROLES (CRUD) =====
  crearRol(data: CatalogoModel) {
    return this.http.post<CatalogoModel>(this.apiUrl + 'rol', data);
  }
 
  actualizarRol(id: number, data: CatalogoModel) {
    return this.http.put<CatalogoModel>(this.apiUrl + 'rol/' + id, data);
  }
 
  eliminarRol(id: number) {
    return this.http.delete(this.apiUrl + 'rol/' + id);
  }
 
  // ===== ESTADOS DE USUARIO (CRUD) =====
  crearEstado(data: CatalogoModel) {
    return this.http.post<CatalogoModel>(this.apiUrl + 'estado_usuarios', data);
  }
 
  actualizarEstado(id: number, data: CatalogoModel) {
    return this.http.put<CatalogoModel>(this.apiUrl + 'estado_usuarios/' + id, data);
  }
 
  eliminarEstado(id: number) {
    return this.http.delete(this.apiUrl + 'estado_usuarios/' + id);
  }
}