import { AfterViewInit, ChangeDetectorRef, Component, NgModule, OnChanges, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import usuarios from '../../../usuarios.json'
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

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
  imports: [
    CommonModule,
    FormsModule,
    SweetAlert2Module
  ],
  templateUrl: './tabela-usuarios.component.html',
  styleUrl: './tabela-usuarios.component.css'
})

export class TabelaUsuariosComponent implements AfterViewInit {
  filtroTexto: string = "";
  filtroSetor: string = "";
  usuariosLista: Usuario[] = usuarios;
  totalLinhas: number = 0;
  totalPaginas: number = this.paginas.length;
  paginaAtual: number = 1;
  itensPorPagina: number = 20;

  @ViewChildren("usuarioRows") usuarioRows!: QueryList<any>

  constructor(private cdr: ChangeDetectorRef  ) {}

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

  mudarPagina(pagina: number): void {
    this.paginaAtual = pagina;
  }

  paginas(): number[] {
    return Array(Math.ceil(this.usuarioFiltrado().length / this.itensPorPagina)).fill(0).map((x,i) => i + 1);
  }

  usuariosPaginados(): Usuario[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const final = inicio + this.itensPorPagina;
    return this.usuarioFiltrado().slice(inicio,final);
  }

  exportarCSV() {
    const data = usuarios;
    const replacer = (key: string, value: any) => (value === null || value === "" ? "S/V" : value);
    const header = Object.keys(data[0]) as Array<keyof Usuario>;
    const csv = data.map(row =>
      header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(",")
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const a = document.createElement("a");
    const blob = new Blob([csvArray], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = "USUARIOS.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove;

    Swal.fire({
      title: "Exportação realizada",
      text: "Seu documento CSV foi baixado com sucesso",
      icon: "success"
    });
  }

  importarCSV() {
    Swal.fire({
      title: "Importação não executada",
      text: "Esta feature ainda não está disponível",
      icon: "error"
    });
  }
}
