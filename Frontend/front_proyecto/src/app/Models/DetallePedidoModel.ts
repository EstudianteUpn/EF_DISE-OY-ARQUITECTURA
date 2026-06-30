import { PedidoModel } from './PedidoModel';
import { ProductoModel } from './ProductosModels';

export interface DetallePedidoModel {
  id: number;
  cantidad: number;
  precio_unitario: number;
  precio_sin_igv: number;
  igv: number;
  descuento: number;
  subtotal: number;
  pedido: PedidoModel;
  producto: ProductoModel;
}

export interface DetallePedidoRequestModel {
  id: number;
  cantidad: number;
  precio_unitario: number;
  precio_sin_igv: number;
  igv: number;
  descuento: number;
  subtotal: number;
  pedido: { id: number };
  producto: { id: number };
}