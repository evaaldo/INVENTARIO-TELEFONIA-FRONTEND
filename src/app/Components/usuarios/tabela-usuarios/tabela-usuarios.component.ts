import { AfterViewInit, ChangeDetectorRef, Component, NgModule, OnChanges, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import usuarios from '../../../usuarios.json'
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { Usuario } from '../../../Interfaces/IUsuario';
import { UserService } from '../../../Services/UserService.service';
import { Router } from '@angular/router';

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
  teste: string = "teste";
  filtroTexto: string = "";
  filtroSetor: string = "";
  totalLinhas: number = 0;
  totalPaginas: number = this.paginas.length;
  paginaAtual: number = 1;
  itensPorPagina: number = 20;

  @ViewChildren("usuarioRows") usuarioRows!: QueryList<any>

  constructor(private cdr: ChangeDetectorRef, private userService: UserService, private router: Router) {}

  ngAfterViewInit(): void {
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
    const paginas = Array(Math.ceil(this.usuarioFiltrado().length / this.itensPorPagina)).fill(0).map((x,i) => i + 1);
    if(pagina > 0 && pagina <= paginas.length) {
      this.paginaAtual = pagina;
    }
  }

  paginas(): number[] {
    return Array(Math.ceil(this.usuarioFiltrado().length / this.itensPorPagina)).fill(0).map((x,i) => i + 1);
  }

  usuariosPaginados(): Usuario[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const final = inicio + this.itensPorPagina;
    return this.usuarioFiltrado().slice(inicio,final);
  }

  exportarCSV(): void {
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

  importarCSV(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      Swal.fire({
        title: 'Importação não executada',
        text: 'Nenhum arquivo selecionado',
        icon: 'error'
      });
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const rows = text.split('\n');
      const header = rows[0].split(',').map(h => h.trim());
      const data = rows.slice(1).map(row => {
        const values = row.split(',').map(value => value.trim().replace(/^"|"$/g, ''));
        const usuario: any = {};
        header.forEach((key, index) => {
          usuario[key] = values[index];
        });
        return usuario;
      });
      this.usuariosLista = data as Usuario[];
      this.cdr.detectChanges();
      Swal.fire({
        title: 'Importação realizada',
        text: 'Arquivo CSV importado com sucesso',
        icon: 'success'
      });
    };
    reader.readAsText(file);
  }

  deletarUsuario(usuario: Usuario): void {

    Swal.fire({
      title: "Tem certeza?",
      text: "Você tem certeza que quer deletar esse usuário?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5c5cda",
      cancelButtonColor: "#d33000",
      confirmButtonText: "Sim",
      cancelButtonText: "Não"
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

  atualizarUsuario(usuario: Usuario): void {
    Swal.fire({
      title: "Alteração de Usuário",
      icon: "info",
      html: `<form id="update-user-form" class="d-flex gap-3 flex-column">
                    <div class="form-group">
                      <input id="input-nome" type="text" class="form-control" placeholder="Nome completo" value="${usuario.nome}">
                    </div>
                    <div class="form-group">
                      <input id="input-setor" type="text" class="form-control" placeholder="Diretoria" value="${usuario.setor}">
                    </div>
                    <div class="form-group">
                      <input id="input-operadora" type="text" class="form-control" placeholder="Operadora" value="${usuario.operadora}">
                    </div>
                    <div class="form-group">
                      <input id="input-dispositivo" type="text" class="form-control" placeholder="Aparelho" value="${usuario.dispositivo}">
                    </div>
                    <div class="form-group">
                      <input id="input-imei" type="text" class="form-control" placeholder="IMEI" value="${usuario.imei}">
                    </div>
                    <div class="form-group">
                      <input id="input-telefone" type="text" class="form-control" placeholder="Número" value="${usuario.telefone}">
                    </div>
                    <div class="form-group">
                      <input id="input-cargo" type="text" class="form-control" placeholder="Cargo" value="${usuario.cargoArea}">
                    </div>
                    <div class="row">
                      <div class="form-group col-sm-6">
                        <input id="input-matricula" type="email" class="form-control" placeholder="Matrícula" value="${usuario.matricula}">
                      </div>
                      <div class="form-group col-sm-6">
                        <input id="input-dataAdmissao" type="text" class="form-control" placeholder="Data admissão" value="${usuario.dataAdmissao}">
                      </div>
                    </div>
                  </form>
                  `,
      confirmButtonText: "Salvar",
      confirmButtonColor: "#5c5cda",
       preConfirm: () => {
        const nome = (document.getElementById('input-nome') as HTMLInputElement).value;
        const setor = (document.getElementById('input-setor') as HTMLInputElement).value;
        const operadora = (document.getElementById('input-operadora') as HTMLInputElement).value;
        const dispositivo = (document.getElementById('input-dispositivo') as HTMLInputElement).value;
        const imei = (document.getElementById('input-imei') as HTMLInputElement).value;
        const telefone = (document.getElementById('input-telefone') as HTMLInputElement).value;
        const cargoArea = (document.getElementById('input-cargo') as HTMLInputElement).value;
        const matricula = (document.getElementById('input-matricula') as HTMLInputElement).value;
        const dataAdmissao = (document.getElementById('input-dataAdmissao') as HTMLInputElement).value;

        if (!nome || !setor || !operadora || !dispositivo || !imei || !telefone || !cargoArea || !matricula || !dataAdmissao) {
          Swal.showValidationMessage("Todos os campos são obrigatórios!");
        };

        return {
          id: usuario.id,
          urlFoto: usuario.urlFoto,
          nome,
          setor,
          operadora,
          dispositivo,
          imei,
          telefone,
          cargoArea,
          matricula,
          dataAdmissao
        };
       }
    }).then((result) => {
      if(result.isConfirmed) {
        const usuarioAtualizado = result.value as Usuario;
        this.userService.updateUsuarios(usuarioAtualizado);
        this.atualizarListaUsuarios();
        Swal.fire({
          title: "Alteração realizada!",
          text: `Usuário alterado com sucesso!`,
          icon: "success"
        });
      }
    })
  }

  atualizarListaUsuarios(): void {
    this.usuariosLista = this.userService.getUsuarios();
  }
}
