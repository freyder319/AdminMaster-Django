import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Proveedor } from '../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modify-proveedor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modify-proveedor.component.html',
  styleUrls: ['./modify-proveedor.component.scss']
})
export class ModifyProveedorComponent {
  @Input() proveedor!: Proveedor;
  @Output() guardar = new EventEmitter<Proveedor>();

  enviarCambios() {
    this.guardar.emit(this.proveedor);

    Swal.fire({
      icon: 'success',
      title: 'Modificación Exitosa',
      text: 'El Proveedor ha sido Actualizado Correctamente',
      confirmButtonColor: '#3085d6'
    });
  }
}
