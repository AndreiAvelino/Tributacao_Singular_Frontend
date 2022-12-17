import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { FotoService } from "src/services/foto.service";
import { LocalStorageService } from "src/services/local-storage.service";
import { FotoUsuario } from "./foto-perfil.component";

@Injectable({
    providedIn: 'root',
  })
  export class FotoResolver implements Resolve<any> {

    private foto: FotoUsuario;

    constructor(
        private _localStorage: LocalStorageService,
        private fotoUsuarioService: FotoService) 
    {}

    async resolve(){
        await this.RecuperarFoto();

        return this.foto;
    }
    
    async RecuperarFoto(): Promise<void> {
        await this.fotoUsuarioService.get(this._localStorage.get_user_id())
                .toPromise()
                .then(r => this.foto = r)
    }
    
}