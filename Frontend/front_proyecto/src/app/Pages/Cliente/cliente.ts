import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../Services/ClienteService';
import { TelefonoService } from '../../Services/TelefonoService';
import { DireccionClienteService } from '../../Services/DireccionClienteService';
import { ClienteModel } from '../../Models/ClienteModel';
import { TelefonoModel, TelefonoRequestModel } from '../../Models/TelefonoModel';
import { DireccionClienteModel, DireccionClienteRequestModel } from '../../Models/DireccionClienteModel';

type Tab = 'clientes' | 'direcciones';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente.html',
  styleUrl: './cliente.css',
})
export class Cliente implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private clienteService = inject(ClienteService);
  private telefonoService = inject(TelefonoService);
  private direccionService = inject(DireccionClienteService);

  tabActivo: Tab = 'clientes';

  cambiarTab(tab: Tab) {
    this.tabActivo = tab;
    this.resetForms();
  }

  listaClientes: ClienteModel[] = [];
  listaTelefonos: TelefonoModel[] = [];
  busquedaCliente = '';

  get clientesFiltrados() {
    const q = this.busquedaCliente.toLowerCase();
    return q ? this.listaClientes.filter(c =>
      c.nombre.toLowerCase().includes(q) ||
      c.apellido_paterno.toLowerCase().includes(q) ||
      c.apellido_materno.toLowerCase().includes(q) ||
      c.dni.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    ) : this.listaClientes;
  }

  editandoClienteId: number | null = null;
  editandoNombre = '';
  editandoApellidoPaterno = '';
  editandoApellidoMaterno = '';
  editandoDni = '';
  editandoEmail = '';
  editandoFechaRegistro = '';
  editandoTelefonoId: number | null = null;
  editandoTelefono = '';
  editandoTipoTelefono = 'Celular';

  dirLista: DireccionClienteModel[] = [];

  dirEditandoId: number | null = null;
  dirEditandoNombre = '';
  dirEditandoDistrito = '';
  dirEditandoDireccion = '';
  dirEditandoCodigoPostal = '';
  dirEditandoDepartamento = '';
  dirEditandoCiudad = '';
  dirEditandoEsPrincipal = false;
  dirEditandoClienteId = 0;

  ngOnInit() {
    this.cargarClientes();
    this.cargarTelefonos();
    this.cargarDirecciones();
  }

  cargarClientes() {
    this.clienteService.listar().subscribe({
      next: d => { this.listaClientes = d; this.cdr.detectChanges(); },
      error: e => console.error(e)
    });
  }

  cargarTelefonos() {
    this.telefonoService.listar().subscribe({
      next: d => { this.listaTelefonos = d; this.cdr.detectChanges(); },
      error: e => console.error(e)
    });
  }

  cargarDirecciones() {
    this.direccionService.listar().subscribe({
      next: d => { this.dirLista = d; this.cdr.detectChanges(); },
      error: e => console.error(e)
    });
  }

  telefonoDeCliente(idCliente: number): TelefonoModel | undefined {
    return this.listaTelefonos.find(t => t.cliente?.id === idCliente);
  }

  iniciarEdicionCliente(item: ClienteModel) {
    this.editandoClienteId = item.id;
    this.editandoNombre = item.nombre;
    this.editandoApellidoPaterno = item.apellido_paterno;
    this.editandoApellidoMaterno = item.apellido_materno;
    this.editandoDni = item.dni;
    this.editandoEmail = item.email;
    this.editandoFechaRegistro = item.fecha_registro;

    const tel = this.telefonoDeCliente(item.id);
    this.editandoTelefonoId = tel ? tel.id : null;
    this.editandoTelefono = tel ? tel.numero : '';
    this.editandoTipoTelefono = tel ? tel.tipo : 'Celular';
  }

  guardarEdicionCliente() {
    if (
      this.editandoClienteId === null ||
      !this.editandoNombre.trim() ||
      !this.editandoApellidoPaterno.trim() ||
      !this.editandoDni.trim() ||
      !this.editandoEmail.trim() ||
      !/^\d{9}$/.test(this.editandoTelefono)
    ) return;

    const actualizado: ClienteModel = {
      id: this.editandoClienteId,
      nombre: this.editandoNombre,
      apellido_paterno: this.editandoApellidoPaterno,
      apellido_materno: this.editandoApellidoMaterno,
      dni: this.editandoDni,
      email: this.editandoEmail,
      fecha_registro: this.editandoFechaRegistro,
      fecha_ultima_modificacion: ''
    };

    this.clienteService.actualizar(this.editandoClienteId, actualizado).subscribe({
      next: () => {
        const telefonoData: TelefonoRequestModel = {
          id: this.editandoTelefonoId ?? 0,
          numero: this.editandoTelefono,
          tipo: this.editandoTipoTelefono,
          cliente: { id: this.editandoClienteId! }
        };

        const guardarTelefono$ = this.editandoTelefonoId
          ? this.telefonoService.actualizar(this.editandoTelefonoId, telefonoData)
          : this.telefonoService.crear(telefonoData);

        guardarTelefono$.subscribe({
          next: () => {
            this.cancelarEdicionCliente();
            this.cargarClientes();
            this.cargarTelefonos();
          },
          error: e => console.error(e)
        });
      },
      error: e => console.error(e)
    });
  }

  cancelarEdicionCliente() {
    this.editandoClienteId = null;
    this.editandoNombre = ''; this.editandoApellidoPaterno = ''; this.editandoApellidoMaterno = '';
    this.editandoDni = ''; this.editandoEmail = ''; this.editandoFechaRegistro = '';
    this.editandoTelefonoId = null; this.editandoTelefono = ''; this.editandoTipoTelefono = 'Celular';
  }

  get modalClienteAbierto(): boolean { return this.editandoClienteId !== null; }

  iniciarEdicionDireccion(item: DireccionClienteModel) {
    this.dirEditandoId = item.id;
    this.dirEditandoNombre = item.nombre;
    this.dirEditandoDistrito = item.distrito;
    this.dirEditandoDireccion = item.direccion;
    this.dirEditandoCodigoPostal = item.codigo_postal;
    this.dirEditandoDepartamento = item.departamento;
    this.dirEditandoCiudad = item.ciudad;
    this.dirEditandoEsPrincipal = item.es_principal;
    this.dirEditandoClienteId = item.cliente?.id ?? 0;
  }

  guardarEdicionDireccion() {
    if (
      this.dirEditandoId === null ||
      !this.dirEditandoNombre.trim() ||
      !this.dirEditandoDistrito.trim() ||
      !this.dirEditandoDireccion.trim() ||
      !this.dirEditandoDepartamento.trim() ||
      !this.dirEditandoCiudad.trim() ||
      this.dirEditandoClienteId === 0
    ) return;

    const actualizado: DireccionClienteRequestModel = {
      id: this.dirEditandoId,
      nombre: this.dirEditandoNombre,
      distrito: this.dirEditandoDistrito,
      direccion: this.dirEditandoDireccion,
      codigo_postal: this.dirEditandoCodigoPostal,
      departamento: this.dirEditandoDepartamento,
      ciudad: this.dirEditandoCiudad,
      es_principal: this.dirEditandoEsPrincipal,
      cliente: { id: this.dirEditandoClienteId }
    };

    this.direccionService.actualizar(this.dirEditandoId, actualizado).subscribe({
      next: () => { this.cancelarEdicionDireccion(); this.cargarDirecciones(); },
      error: e => console.error(e)
    });
  }

  cancelarEdicionDireccion() {
    this.dirEditandoId = null;
    this.dirEditandoNombre = ''; this.dirEditandoDistrito = ''; this.dirEditandoDireccion = '';
    this.dirEditandoCodigoPostal = ''; this.dirEditandoDepartamento = ''; this.dirEditandoCiudad = '';
    this.dirEditandoEsPrincipal = false; this.dirEditandoClienteId = 0;
  }

  eliminarDireccion(id: number) {
    if (!confirm('¿Eliminar esta dirección?')) return;
    this.direccionService.eliminar(id).subscribe({
      next: () => this.cargarDirecciones(),
      error: e => console.error(e)
    });
  }

  nombreCliente(item: DireccionClienteModel): string {
    if (!item.cliente) return '—';
    const c = this.listaClientes.find(cl => cl.id === item.cliente!.id);
    return c ? `${c.nombre} ${c.apellido_paterno}` : '—';
  }

  private resetForms() {
    this.cancelarEdicionCliente();
    this.cancelarEdicionDireccion();
    this.busquedaCliente = '';
  }
}