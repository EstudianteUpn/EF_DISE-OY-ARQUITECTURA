import { ProductoModel } from './ProductosModels';

export interface StockModel {
  id: number;
  cantidad: number;
  stock_minimo: number;
  producto: ProductoModel;
}
 
export interface StockRequestModel {
  id: number;
  cantidad: number;
  stock_minimo: number;
  producto: { id: number };
}