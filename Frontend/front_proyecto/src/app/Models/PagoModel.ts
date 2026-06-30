import { CatalogoModel } from './CatalogoModel';

export interface ClienteResumenModel {
  id: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno?: string;
  dni: string;
}

export interface PedidoResumenModel {
  id: number;
  cliente?: ClienteResumenModel;
}

export interface PagoModel {
  id: number;
  monto: number;
  fecha_pago: string;
  estado?: CatalogoModel;
  pedido?: PedidoResumenModel;
  tipo_pago?: CatalogoModel;
}