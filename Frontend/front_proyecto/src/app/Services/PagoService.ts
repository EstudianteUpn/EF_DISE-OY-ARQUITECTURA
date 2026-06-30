import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsetting } from '../Settings/AppSettings';
import { PagoModel } from '../Models/PagoModel';

@Injectable({ providedIn: 'root' })
export class PagoService {
  private http = inject(HttpClient);
  private apiUrl = appsetting.apiUrl;

  listar() {
    return this.http.get<PagoModel[]>(this.apiUrl + 'pago');
  }
}