import { Injectable } from "@angular/core";
import { Usuario } from "../Interfaces/IUsuario";
import usuarios from "../usuarios.json"

@Injectable({
  providedIn: 'root'
})

export class UserService {
  usuariosLista: Usuario[] = usuarios

  getUsuarios() {
    return this.usuariosLista;
  }

  deleteUsuarios(id: number): void {
    this.usuariosLista = this.usuariosLista.filter(usuario => usuario.id !== id);
  }
}
