import { AfterViewInit, ChangeDetectorRef, Component, NgModule, OnChanges, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import usuarios from '../../../usuarios.json'
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { Usuario } from '../../../Interfaces/IUsuario';
import { UserService } from '../../../Services/UserService.service';

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
  usuariosLista: Usuario[] = this.userService.getUsuarios();
  filtroTexto: string = "";
  filtroSetor: string = "";
  totalLinhas: number = 0;
  totalPaginas: number = this.paginas.length;
  paginaAtual: number = 1;
  itensPorPagina: number = 20;

  @ViewChildren("usuarioRows") usuarioRows!: QueryList<any>

  constructor(private cdr: ChangeDetectorRef, private userService: UserService) {}

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

  deletarUsuario(usuario: Usuario) {


    Swal.fire({
      title: "Tem certeza?",
      text: "Você tem certeza que quer deletar esse usuário?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Apagar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUsuarios(usuario.id);
        this.atualizarListaUsuarios();
        Swal.fire({
          title: "Exclusão realizada!",
          text: `Usuário ${usuario.nome} excluído com sucesso!`,
          icon: "success"
        });
      }
    });


  }

  atualizarListaUsuarios(): void {
    this.usuariosLista = this.userService.getUsuarios();
  }
}
