import { Component, inject, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../Services/UsuarioService';
import { UsuarioModel, UsuarioRequestModel } from '../../../Models/UsuarioModel';
import { ClienteModel } from '../../../Models/ClienteModel';
import { CatalogoModel } from '../../../Models/CatalogoModel';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
export class Usuario implements OnInit {
  private usuarioService = inject(UsuarioService);
  private cdr = inject(ChangeDetectorRef);

  tabActivo = signal<'usuarios' | 'roles' | 'estados'>('usuarios');

  lista: UsuarioModel[] = [];
  clientes: ClienteModel[] = [];
  estados: CatalogoModel[] = [];
  roles: CatalogoModel[] = [];

  busquedaUsuario = '';
  filtroRolId = 0;

  // ===== Edición de usuario (sin creación, ya tienes ese formulario) =====
  editandoId: number | null = null;
  editandoEmail: string = '';
  editandoPassword: string = '';
  editandoClienteId: number = 0;
  editandoEstadoId: number = 0;
  editandoRolId: number = 0;
  editandoFechaCreacion: string = '';

  usuarioSeleccionado: UsuarioModel | null = null;

  // ===== Roles (CRUD) =====
  nuevoRolNombre = '';
  editandoRolCatId: number | null = null;
  editandoRolCatNombre = '';

  // ===== Estados (CRUD) =====
  nuevoEstadoNombre = '';
  editandoEstId: number | null = null;
  editandoEstNombre = '';

  ngOnInit() {
    this.cargarLista();
    this.cargarClientes();
    this.cargarEstados();
    this.cargarRoles();
  }

  cambiarTab(tab: 'usuarios' | 'roles' | 'estados') {
    this.tabActivo.set(tab);
  }

  cargarLista() {
    this.usuarioService.listar().subscribe({
      next: (data) => { this.lista = data; this.cdr.markForCheck(); },
      error: (err) => console.log(err.message)
    });
  }

  cargarClientes() {
    this.usuarioService.listarClientes().subscribe({
      next: (data) => { this.clientes = data; this.cdr.markForCheck(); },
      error: (err) => console.log(err.message)
    });
  }

  cargarEstados() {
    this.usuarioService.listarEstados().subscribe({
      next: (data) => { this.estados = data; this.cdr.markForCheck(); },
      error: (err) => console.log(err.message)
    });
  }

  cargarRoles() {
    this.usuarioService.listarRoles().subscribe({
      next: (data) => { this.roles = data; this.cdr.markForCheck(); },
      error: (err) => console.log(err.message)
    });
  }

  // ===== USUARIOS: ver / editar / eliminar =====

  abrirVerUsuario(item: UsuarioModel) {
    this.usuarioSeleccionado = item;
    this.cdr.markForCheck();
  }

  cerrarVerUsuario() {
    this.usuarioSeleccionado = null;
    this.cdr.markForCheck();
  }

  iniciarEdicion(item: UsuarioModel) {
    this.editandoId = item.id;
    this.editandoEmail = item.email;
    this.editandoPassword = '';
    this.editandoClienteId = item.cliente?.id ?? 0;
    this.editandoEstadoId = item.estado?.id ?? 0;
    this.editandoRolId = item.rol?.id ?? 0;
    this.editandoFechaCreacion = item.fecha_creacion;
    this.cdr.markForCheck();
  }

  guardarEdicion() {
    if (
      this.editandoId === null ||
      !this.editandoEmail.trim() ||
      this.editandoClienteId === 0 ||
      this.editandoEstadoId === 0 ||
      this.editandoRolId === 0
    ) return;

    const actualizado: UsuarioRequestModel = {
      id: this.editandoId,
      email: this.editandoEmail,
      password: this.editandoPassword,
      fecha_creacion: this.editandoFechaCreacion,
      fecha_modificacion: '',
      cliente: { id: this.editandoClienteId },
      estado: { id: this.editandoEstadoId },
      rol: { id: this.editandoRolId }
    };

    this.usuarioService.actualizar(this.editandoId, actualizado).subscribe({
      next: () => {
        this.cancelarEdicion();
        this.cargarLista();
      },
      error: (err) => console.log(err.message)
    });
  }

  cancelarEdicion() {
    this.editandoId = null;
    this.editandoEmail = '';
    this.editandoPassword = '';
    this.editandoClienteId = 0;
    this.editandoEstadoId = 0;
    this.editandoRolId = 0;
    this.editandoFechaCreacion = '';
    this.cdr.markForCheck();
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar este usuario?')) return;
    this.usuarioService.eliminar(id).subscribe({
      next: () => this.cargarLista(),
      error: (err) => console.log(err.message)
    });
  }

  nombreCliente(item: UsuarioModel): string {
    if (!item.cliente) return '—';
    return `${item.cliente.nombre} ${item.cliente.apellido_paterno}`;
  }

  get listaFiltrada(): UsuarioModel[] {
    const texto = this.busquedaUsuario.toLowerCase();
    return this.lista.filter(item => {
      const coincideBusqueda = !texto ||
        item.email?.toLowerCase().includes(texto) ||
        item.cliente?.nombre?.toLowerCase().includes(texto) ||
        item.cliente?.apellido_paterno?.toLowerCase().includes(texto);

      const coincideRol = Number(this.filtroRolId) === 0 || item.rol?.id === Number(this.filtroRolId);

      return coincideBusqueda && coincideRol;
    });
  }

  claseEstadoUsuario(nombre: string | undefined): string {
    const n = (nombre || '').toLowerCase();
    if (n.includes('activo')) return 'ped-badge--verde';
    if (n.includes('suspendido')) return 'ped-badge--amarillo';
    if (n.includes('inactivo') || n.includes('bloqueado')) return 'ped-badge--rojo';
    return 'ped-badge--azul';
  }

  // ===== ROLES: crear / editar / eliminar =====

  registrarRol() {
    if (!this.nuevoRolNombre.trim()) return;
    this.usuarioService.crearRol({ id: 0, nombre: this.nuevoRolNombre.trim() }).subscribe({
      next: () => { this.nuevoRolNombre = ''; this.cargarRoles(); },
      error: (err) => console.log(err.message)
    });
  }

  iniciarEdicionRol(r: CatalogoModel) {
    this.editandoRolCatId = r.id;
    this.editandoRolCatNombre = r.nombre;
    this.cdr.markForCheck();
  }

  guardarEdicionRol() {
    if (this.editandoRolCatId === null || !this.editandoRolCatNombre.trim()) return;
    this.usuarioService.actualizarRol(this.editandoRolCatId, { id: this.editandoRolCatId, nombre: this.editandoRolCatNombre.trim() }).subscribe({
      next: () => { this.editandoRolCatId = null; this.cargarRoles(); },
      error: (err) => console.log(err.message)
    });
  }

  cancelarEdicionRol() {
    this.editandoRolCatId = null;
    this.cdr.markForCheck();
  }

  eliminarRol(id: number) {
    if (!confirm('¿Eliminar este rol?')) return;
    this.usuarioService.eliminarRol(id).subscribe({
      next: () => this.cargarRoles(),
      error: (err) => console.log(err.message)
    });
  }

  // ===== ESTADOS: crear / editar / eliminar =====

  registrarEstado() {
    if (!this.nuevoEstadoNombre.trim()) return;
    this.usuarioService.crearEstado({ id: 0, nombre: this.nuevoEstadoNombre.trim() }).subscribe({
      next: () => { this.nuevoEstadoNombre = ''; this.cargarEstados(); },
      error: (err) => console.log(err.message)
    });
  }

  iniciarEdicionEst(e: CatalogoModel) {
    this.editandoEstId = e.id;
    this.editandoEstNombre = e.nombre;
    this.cdr.markForCheck();
  }

  guardarEdicionEst() {
    if (this.editandoEstId === null || !this.editandoEstNombre.trim()) return;
    this.usuarioService.actualizarEstado(this.editandoEstId, { id: this.editandoEstId, nombre: this.editandoEstNombre.trim() }).subscribe({
      next: () => { this.editandoEstId = null; this.cargarEstados(); },
      error: (err) => console.log(err.message)
    });
  }

  cancelarEdicionEst() {
    this.editandoEstId = null;
    this.cdr.markForCheck();
  }

  eliminarEstado(id: number) {
    if (!confirm('¿Eliminar este estado de usuario?')) return;
    this.usuarioService.eliminarEstado(id).subscribe({
      next: () => this.cargarEstados(),
      error: (err) => console.log(err.message)
    });
  }

  claseEstadoBadge(nombre: string | undefined): string {
    const n = (nombre || '').toLowerCase();
    if (n.includes('activo')) return 'ped-badge--verde';
    if (n.includes('suspendido')) return 'ped-badge--amarillo';
    if (n.includes('inactivo') || n.includes('bloqueado')) return 'ped-badge--rojo';
    return 'ped-badge--azul';
  }
}