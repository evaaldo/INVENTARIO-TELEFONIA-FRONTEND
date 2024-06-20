import { Component } from '@angular/core';
import { TabelaUsuariosComponent } from './tabela-usuarios/tabela-usuarios.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [TabelaUsuariosComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

}
