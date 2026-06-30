import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/AuthService';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {

  nombre = '';
  apellidoPaterno = '';
  apellidoMaterno = '';
  dni = '';
  email = '';
  password = '';
  telefono = '';
  tipoTelefono = 'Celular';

  mensajeError = '';
  mensajeExito = '';
  cargando = false;

  constructor(private authService: AuthService, private router: Router) {}

  registrar() {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (!/^\d{9}$/.test(this.telefono)) {
      this.mensajeError = 'El teléfono debe tener exactamente 9 dígitos.';
      return;
    }

    this.cargando = true;

    const datos = {
      nombre: this.nombre,
      apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno: this.apellidoMaterno,
      dni: this.dni,
      email: this.email,
      password: this.password,
      telefono: this.telefono,
      tipoTelefono: this.tipoTelefono
    };

    this.authService.registrar(datos).subscribe({
      next: () => {
        this.mensajeExito = '¡Cuenta creada exitosamente!';
        this.cargando = false;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.mensajeError = err.error?.message || 'Error al registrar. Intenta nuevamente.';
        this.cargando = false;
      }
    });
  }
}