import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { SearchCardComponent } from './Components/home/search-card/search-card.component';
import { UsuariosComponent } from './Components/usuarios/usuarios.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    SearchCardComponent,
    UsuariosComponent,
    NotfoundComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'SG3C';
}
