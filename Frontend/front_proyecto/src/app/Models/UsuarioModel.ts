import { ClienteModel } from './ClienteModel';
import { CatalogoModel } from './CatalogoModel';
 
export interface UsuarioModel {
  id: number;
  email: string;
  password: string;
  fecha_creacion: string;
  fecha_modificacion: string;
  cliente: ClienteModel;
  estado: CatalogoModel;
  rol: CatalogoModel;
}
 
export interface UsuarioRequestModel {
  id: number;
  email: string;
  password: string;
  fecha_creacion: string;
  fecha_modificacion: string;
  cliente: { id: number };
  estado: { id: number };
  rol: { id: number };
}
 