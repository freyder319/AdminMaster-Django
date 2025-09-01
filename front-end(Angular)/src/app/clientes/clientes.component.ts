import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddClientesComponent } from '../add_clientes/add_clientes.component';
import { AdminNavbarComponent } from '../admin_navbar/admin_navbar.component';
import { ModifyClientesComponent } from '../modify-clientes/modify-clientes.component';
declare var bootstrap: any;

interface Cliente {
  idcliente: number;
  clienteNom: string;
  clienteApel: string;
  clienteTel: string;
  clienteCor: string;
  clienteEst: string;
}

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, AddClientesComponent, AdminNavbarComponent, ModifyClientesComponent],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  private http = inject(HttpClient);
  clientes: Cliente[] = [];
  selectedCliente!: Cliente;

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes() {
    this.http.get<Cliente[]>('http://127.0.0.1:8000/api/clientes/')
      .subscribe({
        next: (data) => this.clientes = data,
        error: (err) => console.error('Error al cargar clientes', err)
      });
  }

  eliminarCliente(id: number) {
    if (confirm('¿Seguro que deseas eliminar este cliente?')) {
      this.http.delete(`http://127.0.0.1:8000/api/clientes/${id}/`)
        .subscribe({
          next: () => {
            alert('✅ Cliente eliminado con éxito');
            this.clientes = this.clientes.filter(c => c.idcliente !== id);
          },
          error: (err) => {
            console.error('Error al eliminar cliente', err);
            alert('❌ Error al eliminar cliente');
          }
        });
    }
  }

  abrirModificar(cliente: Cliente) {
    this.selectedCliente = { ...cliente }; // Copia para editar
    const offcanvasEl = document.getElementById('modifyOffcanvas');
    const bsOffcanvas = new bootstrap.Offcanvas(offcanvasEl);
    bsOffcanvas.show();
  }

  actualizarLista() {
    this.cargarClientes();
  }
}
