import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { UsuariosComponent } from './Components/usuarios/usuarios.component';
import { FormUsuariosComponent } from './Components/usuarios/form-usuarios/form-usuarios.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';

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
  },
  {
    path: 'dispositivos',
    component: NotfoundComponent
  },
  {
    path: 'termoResponsabilidade',
    component: NotfoundComponent
  },
  {
    path: 'notasFiscais',
    component: NotfoundComponent
  },
  {
    path: 'planosContas',
    component: NotfoundComponent
  },
  {
    path: 'linhasTelefonicas',
    component: NotfoundComponent
  },
];
