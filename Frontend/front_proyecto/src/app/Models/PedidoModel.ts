import { ClienteModel } from './ClienteModel';
import { DireccionClienteModel } from './DireccionClienteModel';

export interface EstadoPedidoModel {
  id: number;
  nombre: string;
}

export interface PedidoModel {
  id: number;
  fecha_creacion: string;
  fecha_modificacion: string;
  total: number;
  tipo_venta: string;
  estado: EstadoPedidoModel;
  cliente: ClienteModel;
  direccion_cliente?: DireccionClienteModel;
}

export interface PedidoRequestModel {
  id: number;
  total: number;
  tipo_venta: string;
  estado: { id: number };
  cliente: { id: number };
  direccion_cliente?: { id: number } | null;
}