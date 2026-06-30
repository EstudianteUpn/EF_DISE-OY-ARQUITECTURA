import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsetting } from '../Settings/AppSettings';
import { TransaccionModel } from '../Models/TransaccionModel';
 
@Injectable({ providedIn: 'root' })
export class TransaccionService {
  private http = inject(HttpClient);
  private apiUrl = appsetting.apiUrl;
 
  listar() {
    return this.http.get<TransaccionModel[]>(this.apiUrl + 'transaccion_pago_online');
  }
}