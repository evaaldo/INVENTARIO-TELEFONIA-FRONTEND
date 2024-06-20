import { Component, input } from '@angular/core';
import { CardHomeComponent } from './card-home/card-home.component';
import { SearchCardComponent } from './search-card/search-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardHomeComponent,
    SearchCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
