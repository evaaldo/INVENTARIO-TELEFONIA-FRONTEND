import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { UsuariosComponent } from './Components/usuarios/usuarios.component';
import { FormUsuariosComponent } from './Components/usuarios/form-usuarios/form-usuarios.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path: 'formularioUsuarios',
    component: FormUsuariosComponent
  }
];
