import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NiubizService {
  private baseUrl = 'http://localhost:8080/api/niubiz';

  constructor(private http: HttpClient) {}

  crearSesion(monto: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/sesion`, { monto });
  }
}