import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from '../../Services/CarritoService';

@Component({
  selector: 'app-checkout-resultado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout-resultado.html',
  styleUrl: './checkout-resultado.css'
})
export class CheckoutResultado implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private carritoService = inject(CarritoService);

  pedidoId: string | null = null;
  estado: string | null = null;
  aprobado = false;

  ngOnInit() {
    this.pedidoId = this.route.snapshot.queryParamMap.get('pedidoId');
    this.estado = this.route.snapshot.queryParamMap.get('estado');
    this.aprobado = this.estado === 'APROBADO';

    if (this.aprobado) {
      this.carritoService.limpiar();
    }
  }

  irAInicio() {
    this.router.navigate(['/inicio']);
  }

  reintentar() {
    this.router.navigate(['/checkout']);
  }
}