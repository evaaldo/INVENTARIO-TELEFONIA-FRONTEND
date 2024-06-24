import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import usuarios from '../../../usuarios.json'
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
  selector: 'app-tabela-usuarios',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tabela-usuarios.component.html',
  styleUrl: './tabela-usuarios.component.css'
})

export class TabelaUsuariosComponent {
  filtroTexto: string = "";
  filtroSetor: string = "";
  filtroAlfabetico: string = "";
  usuariosLista: Usuario[] = usuarios;
  alfabeto: string = "abcdefghijklmnopqrstuvwxyz";

  usuarioFiltrado(): Usuario[] {
    return this.usuariosLista.filter(usuario => {
      const setorFiltrado = this.filtroSetor ? usuario.setor === this.filtroSetor : true;
      const textoFiltrado = this.filtroTexto ? usuario.nome.toLowerCase().includes(this.filtroTexto.toLowerCase()) : true;
      const ordemAlfabetica = this.filtroAlfabetico ? usuario.nome.toLowerCase().startsWith("a") : true;
      return setorFiltrado && textoFiltrado && ordemAlfabetica;
    })
  }
}
