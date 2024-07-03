import { AfterViewInit, ChangeDetectorRef, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import usuarios from '../../../usuarios.json'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../Interfaces/IUsuario';

@Component({
  selector: 'app-search-card',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-card.component.html',
  styleUrl: './search-card.component.css'
})
export class SearchCardComponent implements AfterViewInit {
  usuariosLista: Usuario[] = usuarios;
  filtroSetor: string = "";
  filtroTexto: string = "";
  totalLinhas: number = 0;
  totalPaginas: number = this.paginas.length;
  paginaAtual = 1;
  itensPorPagina: number = 10;

  @ViewChildren("usuarioRows") usuarioRows! : QueryList<any>;

  constructor(private cdr : ChangeDetectorRef) {}

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
      const textoFiltrato = this.filtroSetor ? usuario.setor === this.filtroSetor : true;
      const setorFiltrado = this.filtroTexto ? usuario.nome.toLowerCase().includes(this.filtroTexto.toLowerCase()) : true;
      return textoFiltrato && setorFiltrado;
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
}
