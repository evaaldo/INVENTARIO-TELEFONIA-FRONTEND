import { Component } from '@angular/core';
import { CardHomeComponent } from './card-home/card-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardHomeComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
