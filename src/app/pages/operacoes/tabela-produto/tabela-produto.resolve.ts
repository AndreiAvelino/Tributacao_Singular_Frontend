import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { roles } from "src/consts";
import { ClienteService } from "src/services/cliente.service";
import { LocalStorageService } from "src/services/local-storage.service";
import { ProdutoService } from "src/services/produto.service";

@Injectable({
    providedIn: 'root'
})

export class TabelaProdutoResolve implements Resolve<any> {

    private role;
    private idCliente;
    private roles = roles

    private produtos


    constructor(private _produtoService: ProdutoService,
                private _clienteService: ClienteService,
                private _localStorage: LocalStorageService) {}

    async resolve() {

        //console.log(this.produtos.map(p => JSON.stringify(p)))

        this.role = this._localStorage.get("user").userToken.claims[0].type
        this.idCliente = this._localStorage.get("user").userToken.id
        
        if(this.role == roles.TRIBUTARISTA){
            console.log(this.role)
            await this.get_produtos();
        }
        if(this.role == roles.CLIENTE){
            console.log(this.role)
            await this.get_produtos_cliente(this.idCliente);
        }       

        return {produtos: this.produtos}
    }

    async get_produtos(){
        await this._produtoService.get_all()
            .toPromise()
            .then(r => this.produtos = r.data)
            .catch(e => console.log(e))
    }

    async get_produtos_cliente(id){
        await this._clienteService.get(id)
            .toPromise()
            .then(r => this.produtos = r.data.produtos)
            .catch(e => console.log(e))
    }

}