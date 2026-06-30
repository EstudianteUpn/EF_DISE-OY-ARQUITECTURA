import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsetting } from '../Settings/AppSettings';
import { CatalogoModel } from '../Models/CatalogoModel';

@Injectable({
  providedIn: 'root'
})
export class TipoEntregaService {
  private http = inject(HttpClient);
  private apiUrl = appsetting.apiUrl;

  listar() {
    return this.http.get<CatalogoModel[]>(this.apiUrl + 'tipo_entrega');
  }
}