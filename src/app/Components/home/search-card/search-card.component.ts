import { Component } from '@angular/core';
import usuarios from '../../../usuarios.json'
import { FormsModule } from '@angular/forms';

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
  selector: 'app-search-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-card.component.html',
  styleUrl: './search-card.component.css'
})
export class SearchCardComponent {
  usuariosLista: Usuario[] = usuarios;
  filtroTexto: string = ''

  usuarioFiltradoPorTexto(texto: string): Usuario[] {
    if(this.filtroTexto == '') {
      return this.usuariosLista;
    } else {
      return this.usuariosLista.filter(usuario => {
        return usuario.nome.toLowerCase().includes(texto.toLowerCase());
      })
    }
  }
}
