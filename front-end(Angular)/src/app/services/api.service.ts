import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Proveedor {
  id_proveedor: number;
  nombre_proveedor: string;
  apellido_proveedor: string;
  telefono_proveedor: string;
  correo_proveedor: string;
  deudas_pendientes: number;
  estado_proveedor: string;
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api/proveedores/';

  constructor(private http: HttpClient) {}

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl);
  }

  addProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.apiUrl, proveedor);
  }

  deleteProveedor(id: number) {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  updateProveedor(id: number, proveedor: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(`${this.apiUrl}${id}/`, proveedor);
  }
}
