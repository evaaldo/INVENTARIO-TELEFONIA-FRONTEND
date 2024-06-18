import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-home',
  standalone: true,
  imports: [],
  templateUrl: './card-home.component.html',
  styleUrl: './card-home.component.css'
})
export class CardHomeComponent {
  @Input() titulo: string = "Titulo";
  @Input() icone: string = "A";
  @Input() descricao: string = "Descrição Maior";
  @Input() descricaoMenor: string = "Descrição menor";
  @Input() itemUm: string = "Primeiro item";
  @Input() itemDois: string = "Segundo item";
  @Input() itemTres: string = "Terceiro item";
}
