import { ClienteModel } from './ClienteModel';
 
export interface DireccionClienteModel {
  id: number;
  nombre: string;
  distrito: string;
  direccion: string;
  codigo_postal: string;
  departamento: string;
  ciudad: string;
  es_principal: boolean;
  cliente: ClienteModel;
}
 
export interface DireccionClienteRequestModel {
  id: number;
  nombre: string;
  distrito: string;
  direccion: string;
  codigo_postal: string;
  departamento: string;
  ciudad: string;
  es_principal: boolean;
  cliente: { id: number };
}