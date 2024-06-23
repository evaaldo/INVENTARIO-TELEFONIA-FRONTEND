import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import usuarios from './usuarios.json'

interface Usuario {
  id: number,
  urlFoto: string,
  nome: string,
  matricula: string,
  dataAdmissao: string,
  setor: string,
  operadora: string,
  dispositivo: string,
  imei: string,
  telefone: string,
  cargoArea: string
}

@Component({
  selector: 'app-tabela-usuarios',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tabela-usuarios.component.html',
  styleUrl: './tabela-usuarios.component.css'
})
export class TabelaUsuariosComponent {
  filtroTexto: string = "";
  usuariosLista: Usuario[] = usuarios;

  usuarioFiltradoPorTexto(texto: string): Usuario[] {
    if(!this.filtroTexto) {
      return this.usuariosLista;
    } else {
      return this.usuariosLista.filter(usuario => {
        return usuario.nome.toLowerCase().includes(this.filtroTexto.toLowerCase());
      });
    }
  }
}
