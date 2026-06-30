import { ClienteModel } from './ClienteModel';
 
export interface TelefonoModel {
  id: number;
  numero: string;
  tipo: string;
  cliente: ClienteModel;
}
 
export interface TelefonoRequestModel {
  id: number;
  numero: string;
  tipo: string;
  cliente: { id: number };
}