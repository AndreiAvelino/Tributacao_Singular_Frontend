import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { filter, tap } from "rxjs/operators";
import { CadastroService } from "src/services/cadastro.service";
import { LocalStorageService } from "src/services/local-storage.service";

@Injectable({
    providedIn: 'root'
})

export class TabelaUsuarioResolve implements Resolve<any> {

    private usuarios 

    constructor(private _cadastroService: CadastroService,
                private _localStorage: LocalStorageService) {}

    async resolve() {

        await this.get_usuarios();

        return {usuarios: this.usuarios}
    }

    async get_usuarios(){
        await this._cadastroService.obter_todos(this._localStorage.get_user_id())
            .toPromise()
            .then(r => this.usuarios = r.data)
    }
    

}