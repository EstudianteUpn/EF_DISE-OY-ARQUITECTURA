import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsetting } from '../Settings/AppSettings';
import { CatalogoModel } from '../Models/CatalogoModel';

@Injectable({ providedIn: 'root' })
export class EstadoPagoService {
  private http = inject(HttpClient);
  private apiUrl = appsetting.apiUrl;

  listar() {
    return this.http.get<CatalogoModel[]>(this.apiUrl + 'estado_pago');
  }
  crear(estado: Partial<CatalogoModel>) {
    return this.http.post<CatalogoModel>(this.apiUrl + 'estado_pago', estado);
  }
  actualizar(id: number, estado: Partial<CatalogoModel>) {
    return this.http.put<CatalogoModel>(this.apiUrl + 'estado_pago/' + id, estado);
  }
  eliminar(id: number) {
    return this.http.delete(this.apiUrl + 'estado_pago/' + id);
  }
}