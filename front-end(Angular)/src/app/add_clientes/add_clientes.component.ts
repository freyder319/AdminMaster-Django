import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-clientes',
  standalone: true, // 👈 IMPORTANTE
  imports: [CommonModule, FormsModule], // 👈 para ngIf, ngClass y ngModel
  templateUrl: './add_clientes.component.html',
  styleUrls: ['./add_clientes.component.scss']
})
export class AddClientesComponent {
  private http = inject(HttpClient);

  @Input() visible = false;
  @Output() cerrar = new EventEmitter<void>();
  @Output() clienteAgregado = new EventEmitter<void>();

  estado: string = 'Activo';
  nuevoCliente = {
    clienteNom: '',
    clienteApel: '',
    clienteTel: '',
    clienteCor: '',
    clienteEst: 'Activo'
  };

  agregarCliente() {
  console.log('Datos a enviar:', this.nuevoCliente);
  this.http.post('http://127.0.0.1:8000/api/clientes/', this.nuevoCliente)
    .subscribe({
      next: (data) => {
        console.log('Cliente agregado', data);
        alert('✅ Cliente agregado con éxito');
        window.location.reload(); // 🔥
      },
      error: (err) => {
        console.error('Error al agregar cliente', err);
        console.log('Detalles del error del backend:', err.error);
      }
    });
}

}
