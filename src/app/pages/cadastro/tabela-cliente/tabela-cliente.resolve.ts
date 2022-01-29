import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { CategoriaService } from "src/services/categoria.service";
import { ClienteService } from "src/services/cliente.service";

@Injectable({
    providedIn: 'root'
})

export class TabelaClienteResolve implements Resolve<any> {

    private clientes 

    constructor(private _clienteService: ClienteService) {}

    async resolve() {

        await this.get_clientes();

        console.log(this.clientes)

        return {clientes: this.clientes}
    }

    async get_clientes(){
        await this._clienteService.get_all()
            .toPromise()
            .then(r => this.clientes = r.data)
    }

}