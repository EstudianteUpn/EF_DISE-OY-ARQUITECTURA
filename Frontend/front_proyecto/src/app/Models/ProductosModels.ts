import { CatalogoModel } from './CatalogoModel';
import { CategoriaProductoModel } from './CategoriaProductoModel';

export interface ProductoModel {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  descuento: number;
  imagen_url: string;
  estado: CatalogoModel;         
  categoria: CategoriaProductoModel; 
}

export interface ProductoRequestModel {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  descuento: number;
  imagen_url: string;
  estado: { id: number };
  categoria: { id: number };
}