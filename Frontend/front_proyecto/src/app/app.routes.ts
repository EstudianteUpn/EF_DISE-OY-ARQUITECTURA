import { Routes } from '@angular/router';
import { Producto } from './Pages/producto/producto';
import { Inicio } from './Pages/Inicio/inicio';
import { Catalogos } from './Pages/Admin/catalogos/catalogos';
import { CategoriaProducto } from './Pages/Admin/categoria-producto/categoria-producto';
import { Cliente } from './Pages/Cliente/cliente';
import { Stock } from './Pages/Admin/stock/stock';
import { Usuario } from './Pages/Admin/usuario/usuario';
import { DireccionCliente } from './Pages/Admin/direccion-cliente/direccion-cliente';
import { Telefono } from './Pages/Admin/telefono/telefono';
import { Dashboard } from './Pages/Admin/dashboard/dashboard';
import { Login } from './Pages/login/login';
import { AdminSidebar } from './Pages/admin-sidebar/admin-sidebar';
import { TrabajadorSidebar } from './Pages/trabajador-sidebar/trabajador-sidebar';
import { Registro } from './Pages/registro/registro';
import { Pedido } from './Pages/pedido/pedido';
import { Carrito } from './Pages/carrito/carrito';
import { Checkout } from './Pages/checkout/checkout';
import { adminGuard } from './Services/admin.guard';
import { Conciliaciones } from './Pages/conciliaciones/conciliaciones';
import { Entregas } from './Pages/entregas/entregas';
import { MovimientosBanc } from './Pages/movimientos-banc/movimientos-banc';
import { Pagos } from './Pages/pagos/pagos';
import { Transacciones } from './Pages/transacciones/transacciones';
import { CheckoutResultado } from './Pages/checkout-resultado/checkout-resultado';

export const routes: Routes = [
  
  { path: 'inicio', component: Inicio },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'trabajador-sidebar', component: TrabajadorSidebar },
  { path: 'checkout-resultado', component: CheckoutResultado },

  {
    path: 'admin',
    component: AdminSidebar,
    canActivate: [adminGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'productos', component: Producto },
      { path: 'pedidos', component: Pedido },
      { path: 'catalogos', component: Catalogos },
      { path: 'categoria-producto', component: CategoriaProducto },
      { path: 'stock', component: Stock },
      { path: 'usuario', component: Usuario },
      { path: 'direccion-cliente', component: DireccionCliente },
      { path: 'telefono', component: Telefono },
      { path: 'clientes', component: Cliente },
      { path: 'entregas', component: Entregas },
    { path: 'pagos', component: Pagos },
    { path: 'transacciones', component: Transacciones },
    { path: 'movimientos-banc', component: MovimientosBanc },
    { path: 'conciliaciones', component: Conciliaciones },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  
  { path: 'carrito', component: Carrito },
  { path: 'checkout', component: Checkout },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
];