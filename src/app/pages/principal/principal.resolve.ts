import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { roles } from "src/consts";
import { CadastroService } from "src/services/cadastro.service";
import { CategoriaService } from "src/services/categoria.service";
import { ClienteService } from "src/services/cliente.service";
import { LocalStorageService } from "src/services/local-storage.service";
import { ProdutoService } from "src/services/produto.service";

@Injectable({
    providedIn: 'root'
})

export class PrincipalResolve implements Resolve<any> {

    private role;
 
    private produtos = [];
    private contas = [];
    private clientes = [];
    private categorias = [];

    constructor(private _produtoService: ProdutoService,
                private _clienteService: ClienteService,
                private _cadastroService: CadastroService,
                private _categoriaService: CategoriaService,
                private _localStorage: LocalStorageService) {}

    async resolve() {
        
        if(this._localStorage.get_user_role() == roles.TRIBUTARISTA){
            await this.get_produtos();
            await this.get_categorias();
        }
            
        
        if(this._localStorage.get_user_role() == roles.CLIENTE)
            await this.get_produtos_cliente(this._localStorage.get_user_id());
        
        if(this._localStorage.get_user_role() == roles.ADMINISTRADOR){
            await this.get_contas(this._localStorage.get_user_id())
            await this.get_cliente(); 
        }
        

        return {produtos: this.produtos, contas: this.contas, clientes: this.clientes, categorias: this.categorias}
    }

    async get_produtos(){
        await this._produtoService.get_all()
            .toPromise()
            .then(r => this.produtos = r.data)
    }

    async get_produtos_cliente(id){
        await this._clienteService.get(id)
            .toPromise()
            .then(r => this.produtos = r.data.produtos)
    }

    async get_contas(id){
        await this._cadastroService.obter_todos(id)
            .toPromise()
            .then(r => this.contas = r.data)
    }

    async get_cliente(){
        await this._clienteService.get_all()
            .toPromise()
            .then(r => this.clientes = r.data)
    }

    async get_categorias(){
        await this._categoriaService.get_all()
            .toPromise()
            .then(r => this.categorias = r.data)
    }

}