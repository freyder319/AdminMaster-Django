import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminNavbarComponent } from "../admin_navbar/admin_navbar.component";
import { AddProveedorComponent } from "../add_proveedor/add_proveedor.component";
import { ModifyProveedorComponent } from '../modify-proveedor/modify-proveedor.component';
import { ApiService, Proveedor } from '../services/api.service';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app_proveedores',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNavbarComponent, AddProveedorComponent, ModifyProveedorComponent],
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {
  proveedores: Proveedor[] = [];
  proveedorSeleccionado: Proveedor | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProveedores().subscribe({
      next: (data) => {
        this.proveedores = data;
        console.log('Proveedores recibidos:', data);
      },
      error: (err) => console.error('Error al cargar proveedores', err)
    });
  }

  agregarProveedor(proveedor: Proveedor): void {
    this.proveedores.push(proveedor);
  }

  eliminarProveedor(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el proveedor permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteProveedor(id).subscribe({
          next: () => {
            this.proveedores = this.proveedores.filter(p => p.id_proveedor !== id);
            Swal.fire('Eliminado', 'El proveedor ha sido eliminado.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el proveedor.', 'error');
          }
        });
      }
    });
  }

  abrirFormularioModificar(proveedor: Proveedor): void {
    this.proveedorSeleccionado = { ...proveedor };

    setTimeout(() => {
      const canvas = document.getElementById('modificarProveedorCanvas');
      if (canvas) {
        const offcanvas = new bootstrap.Offcanvas(canvas);
        offcanvas.show();
      }
    }, 0);
  }
  
  modificarProveedor(): void {
    if (!this.proveedorSeleccionado) return;

    const proveedorActualizado: Proveedor = {
      id_proveedor: this.proveedorSeleccionado.id_proveedor,
      nombre_proveedor: this.proveedorSeleccionado.nombre_proveedor,
      apellido_proveedor: this.proveedorSeleccionado.apellido_proveedor,
      telefono_proveedor: this.proveedorSeleccionado.telefono_proveedor,
      correo_proveedor: this.proveedorSeleccionado.correo_proveedor,
      estado_proveedor: this.proveedorSeleccionado.estado_proveedor,
      deudas_pendientes: this.proveedorSeleccionado.deudas_pendientes
    };

    this.apiService.updateProveedor(proveedorActualizado.id_proveedor, proveedorActualizado).subscribe({
      next: (actualizado) => {
      const proveedor = actualizado as Proveedor;
      const index = this.proveedores.findIndex(p => p.id_proveedor === proveedor.id_proveedor);
      if (index !== -1) this.proveedores[index] = proveedor;

      // Cierra el offcanvas
      const canvas = document.getElementById('modificarProveedorCanvas');
      if (canvas) {
        const offcanvas = bootstrap.Offcanvas.getInstance(canvas);
        offcanvas?.hide();
      }

      this.cerrarFormularioModificar();
    }
    });
  }

  cerrarFormularioModificar(): void {
    this.proveedorSeleccionado = null;
  }
}




