import { AfterViewInit, ChangeDetectorRef, Component, QueryList, ViewChildren } from '@angular/core';
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

export class TabelaUsuariosComponent implements AfterViewInit {
  filtroTexto: string = "";
  filtroSetor: string = "";
  usuariosLista: Usuario[] = usuarios;
  totalLinhas: number = 0;

  @ViewChildren("usuarioRows") usuarioRows!: QueryList<any>

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.usuarioRows.changes.subscribe(() => {
      this.totalLinhas = this.usuarioRows.length;
      this.cdr.detectChanges();
    })
    this.totalLinhas = this.usuarioRows.length;
    this.cdr.detectChanges();
  }

  usuarioFiltrado(): Usuario[] {
    return this.usuariosLista.filter(usuario => {
      const setorFiltrado = this.filtroSetor ? usuario.setor === this.filtroSetor : true;
      const textoFiltrado = this.filtroTexto ? usuario.nome.toLowerCase().includes(this.filtroTexto.toLowerCase()) : true;
      return setorFiltrado && textoFiltrado;
    })
  }
}
