import { Component, Input, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Cliente {
  idcliente: number;
  clienteNom: string;
  clienteApel: string;
  clienteTel: string;
  clienteCor: string;
  clienteEst: string;
}

declare var bootstrap: any;

@Component({
  selector: 'app-modify-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modify-clientes.component.html',
  styleUrls: ['./modify-clientes.component.scss']
})
export class ModifyClientesComponent {
  private http = inject(HttpClient);

  @Input() cliente!: Cliente;

  // Evento para notificar al padre que se actualizó la lista
  @Output() clienteActualizado = new EventEmitter<Cliente>();

  modificarCliente() {
    if (!this.cliente) return;

    this.http.put(`http://127.0.0.1:8000/api/clientes/${this.cliente.idcliente}/`, this.cliente)
      .subscribe({
        next: (res) => {
          alert('Cliente modificado con éxito');

          // Emitir al componente padre
          this.clienteActualizado.emit(this.cliente);

          // Cerrar Offcanvas
          const offcanvasEl = document.getElementById('modifyOffcanvas');
          if (offcanvasEl) {
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl) || new bootstrap.Offcanvas(offcanvasEl);
            bsOffcanvas.hide();
          }
        },
        error: (err) => {
          console.error('Error al modificar cliente', err);
          alert('❌ Error al modificar cliente');
        }
      });
  }
}
