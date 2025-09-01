import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Proveedor } from '../services/api.service';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-add-proveedor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add_proveedor.component.html',
  styleUrls: ['./add_proveedor.component.scss']
})
export class AddProveedorComponent {
  @Output() proveedorCreado = new EventEmitter<Proveedor>();
  @ViewChild('offcanvasRef', { static: false }) offcanvasRef!: ElementRef;

  nuevoProveedor: Partial<Proveedor> = {
    nombre_proveedor: '',
    apellido_proveedor: '',
    telefono_proveedor: '',
    correo_proveedor: '',
    estado_proveedor: 'Activo',
    deudas_pendientes: 0
  };

  constructor(private api: ApiService) {}

  crearProveedor() {
    this.api.addProveedor(this.nuevoProveedor as Proveedor).subscribe({
      next: (proveedor) => {
        console.log('Proveedor creado:', proveedor);
        this.proveedorCreado.emit(proveedor);
        this();
      },
      error: (err) => console.error('Error al crear proveedor', err)
    });
    
    Swal.fire({
      icon: 'success',
      title: 'Agregado',
      text: 'El Proveedor ha sido Agregado con Exito',
      confirmButtonColor: '#3085d6'
    });
  }

  cerrarOffcanvas() {
    const offcanvasElement = this.offcanvasRef?.nativeElement;
    if (offcanvasElement) {
      const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
      if (offcanvasInstance) {
        offcanvasInstance.hide();
      }
    }
  }
}
