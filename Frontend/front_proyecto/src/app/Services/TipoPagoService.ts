import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsetting } from '../Settings/AppSettings';
import { CatalogoModel } from '../Models/CatalogoModel';

@Injectable({
  providedIn: 'root'
})
export class TipoPagoService {
  private http = inject(HttpClient);
  private apiUrl = appsetting.apiUrl;

  listar() {
    return this.http.get<CatalogoModel[]>(this.apiUrl + 'tipo_pago');
  }
  crear(tipo: Partial<CatalogoModel>) {
    return this.http.post<CatalogoModel>(this.apiUrl + 'tipo_pago', tipo);
  }
  actualizar(id: number, tipo: Partial<CatalogoModel>) {
    return this.http.put<CatalogoModel>(this.apiUrl + 'tipo_pago/' + id, tipo);
  }
  eliminar(id: number) {
    return this.http.delete(this.apiUrl + 'tipo_pago/' + id);
  }
}