import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/AuthService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  cargando = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.error = '';
    this.cargando = true;

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.cargando = false;
        const rol = this.authService.getRol();
        this.router.navigate([rol === 'ADMIN' || rol === 'TRABAJADOR' ? '/admin/dashboard' : '/inicio']);
      },
      error: () => {
        this.cargando = false;
        this.error = 'Correo o contraseña incorrectos';
      }
    });
  }
}