import { Component } from '@angular/core';
import usuarios from '../../../usuarios.json'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  imports: [FormsModule, CommonModule],
  templateUrl: './search-card.component.html',
  styleUrl: './search-card.component.css'
})
export class SearchCardComponent {
  filtroSetor: string = "";
  filtroTexto: string = "";
  usuariosLista: Usuario[] = usuarios;
  registros: number = this.usuariosLista.length;

  usuarioFiltrado(): Usuario[] {
    return this.usuariosLista.filter(usuario => {
      const textoFiltrato = this.filtroSetor ? usuario.setor === this.filtroSetor : true;
      const setorFiltrado = this.filtroTexto ? usuario.nome.toLowerCase().includes(this.filtroTexto.toLowerCase()) : true;
      return textoFiltrato && setorFiltrado;
    })
  }
}
