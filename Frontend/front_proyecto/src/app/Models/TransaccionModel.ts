import { PagoModel } from './PagoModel';
 
export interface TransaccionModel {
  id: number;
  codigo_transaccion: string;
  numero_operacion: string;
  autorizacion: string;
  medio_pago: string;
  moneda: string;
  estado_transaccion: string;
  fecha_transaccion: string;
  fecha_abono: string;
  pago?: PagoModel;
}