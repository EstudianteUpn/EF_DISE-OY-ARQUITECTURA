import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { appsetting } from '../Settings/AppSettings';

export interface DecodedToken {
  sub: string;
  rol: string;
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = appsetting.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}login`, { email, password }, { observe: 'response' })
      .pipe(
        tap(response => {
          const authHeader = response.headers.get('Authorization');
          if (authHeader) {
            localStorage.setItem('token', authHeader.replace('Bearer ', ''));
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const decoded = this.decodeToken();
    return decoded ? decoded.exp * 1000 > Date.now() : false;
  }

  getRol(): string | null {
    const rol = this.decodeToken()?.rol;
    return rol ? rol.toUpperCase() : null;
  }

  private decodeToken(): DecodedToken | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch {
      return null;
    }
  }

  registrar(datos: {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    dni: string;
    email: string;
    password: string;
    telefono: string;
    tipoTelefono: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}usuario/registro`, datos);
  }
}