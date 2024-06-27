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
  filtroSetor: string = "";
  filtroTexto: string = "";
  usuariosLista: Usuario[] = usuarios;
  totalLinhas: number = 0;

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
}
