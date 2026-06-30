import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsetting } from '../Settings/AppSettings';
import { CatalogoModel } from '../Models/CatalogoModel';

@Injectable({
  providedIn: 'root',
})
export class CatalogosService {
  private http = inject(HttpClient);
  private apiUrl = appsetting.apiUrl;


  
  listarRoles() { 
    return this.http.get<CatalogoModel[]>(this.apiUrl + 'rol'); 
  }
  crearRol(data: CatalogoModel) { 
    return this.http.post<CatalogoModel>(this.apiUrl + 'rol', data); 
  }
  actualizarRol(id: number, data: CatalogoModel) { 
    return this.http.put<CatalogoModel>(this.apiUrl + 'rol/' + id, data); 
  }
  eliminarRol(id: number) { 
    return this.http.delete(this.apiUrl + 'rol/' + id); 
  }



  listarEstadosUsuario() { 
    return this.http.get<CatalogoModel[]>(this.apiUrl + 'estado_usuarios'); 
  }
  crearEstadoUsuario(data: CatalogoModel) { 
    return this.http.post<CatalogoModel>(this.apiUrl + 'estado_usuarios', data); 
  }
  actualizarEstadoUsuario(id: number, data: CatalogoModel) { 
    return this.http.put<CatalogoModel>(this.apiUrl + 'estado_usuarios/' + id, data); 
  }
  eliminarEstadoUsuario(id: number) { 
    return this.http.delete(this.apiUrl + 'estado_usuarios/' + id); 
  }



  listarEstadosProducto() { 
    return this.http.get<CatalogoModel[]>(this.apiUrl + 'estado_productos'); 
  }
  crearEstadoProducto(data: CatalogoModel) { 
    return this.http.post<CatalogoModel>(this.apiUrl + 'estado_productos', data); 
  }
  actualizarEstadoProducto(id: number, data: CatalogoModel) { 
    return this.http.put<CatalogoModel>(this.apiUrl + 'estado_productos/' + id, data); 
  }
  eliminarEstadoProducto(id: number) { 
    return this.http.delete(this.apiUrl + 'estado_productos/' + id); 
  }



  listarEstadosPedido() { 
    return this.http.get<CatalogoModel[]>(this.apiUrl + 'estado_pedido'); 
  }
  crearEstadoPedido(data: CatalogoModel) { 
    return this.http.post<CatalogoModel>(this.apiUrl + 'estado_pedido', data); 
  }
  actualizarEstadoPedido(id: number, data: CatalogoModel) { 
    return this.http.put<CatalogoModel>(this.apiUrl + 'estado_pedido/' + id, data); 
  }
  eliminarEstadoPedido(id: number) { 
    return this.http.delete(this.apiUrl + 'estado_pedido/' + id); 
  }



  listarEstadosPago() { 
    return this.http.get<CatalogoModel[]>(this.apiUrl + 'estado_pago'); 
  }
  crearEstadoPago(data: CatalogoModel) { 
    return this.http.post<CatalogoModel>(this.apiUrl + 'estado_pago', data); 
  }
  actualizarEstadoPago(id: number, data: CatalogoModel) { 
    return this.http.put<CatalogoModel>(this.apiUrl + 'estado_pago/' + id, data); 
  }
  eliminarEstadoPago(id: number) { 
    return this.http.delete(this.apiUrl + 'estado_pago/' + id); 
  }



  listarEstadosEntrega() { 
    return this.http.get<CatalogoModel[]>(this.apiUrl + 'estado_entrega'); 
  }
  crearEstadoEntrega(data: CatalogoModel) { 
    return this.http.post<CatalogoModel>(this.apiUrl + 'estado_entrega', data); 
  }
  actualizarEstadoEntrega(id: number, data: CatalogoModel) { 
    return this.http.put<CatalogoModel>(this.apiUrl + 'estado_entrega/' + id, data); 
  }
  eliminarEstadoEntrega(id: number) { 
    return this.http.delete(this.apiUrl + 'estado_entrega/' + id); 
  }



  listarTiposPago() { 
    return this.http.get<CatalogoModel[]>(this.apiUrl + 'tipo_pago'); 
  }
  crearTipoPago(data: CatalogoModel) { 
    return this.http.post<CatalogoModel>(this.apiUrl + 'tipo_pago', data); 
  }
  actualizarTipoPago(id: number, data: CatalogoModel) { 
    return this.http.put<CatalogoModel>(this.apiUrl + 'tipo_pago/' + id, data); 
  }
  eliminarTipoPago(id: number) { 
    return this.http.delete(this.apiUrl + 'tipo_pago/' + id); 
  }



  listarTiposEntrega() { 
    return this.http.get<CatalogoModel[]>(this.apiUrl + 'tipo_entrega'); 
  }
  crearTipoEntrega(data: CatalogoModel) { 
    return this.http.post<CatalogoModel>(this.apiUrl + 'tipo_entrega', data); 
  }
  actualizarTipoEntrega(id: number, data: CatalogoModel) { 
    return this.http.put<CatalogoModel>(this.apiUrl + 'tipo_entrega/' + id, data); 
  }
  eliminarTipoEntrega(id: number) { 
    return this.http.delete(this.apiUrl + 'tipo_entrega/' + id); 
  }



  listarEstadosConciliacion() { 
    return this.http.get<CatalogoModel[]>(this.apiUrl + 'estado_conciliacion'); 
  }
  crearEstadoConciliacion(data: CatalogoModel) { 
    return this.http.post<CatalogoModel>(this.apiUrl + 'estado_conciliacion', data); 
  }
  actualizarEstadoConciliacion(id: number, data: CatalogoModel) { 
    return this.http.put<CatalogoModel>(this.apiUrl + 'estado_conciliacion/' + id, data); 
  }
  eliminarEstadoConciliacion(id: number) { 
    return this.http.delete(this.apiUrl + 'estado_conciliacion/' + id); 
  }
}