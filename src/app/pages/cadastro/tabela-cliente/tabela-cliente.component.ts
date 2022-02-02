import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ColunasFormulario } from 'src/app/models/ColunasFormulario';
import { routes } from 'src/consts/routes';
import { CadastroService } from 'src/services/cadastro.service';
import { ClienteService } from 'src/services/cliente.service';

@Component({
  selector: 'app-tabela-cliente',
  templateUrl: './tabela-cliente.component.html',
  styleUrls: ['./tabela-cliente.component.scss']
})
export class TabelaClienteComponent {

  private routes = routes

  public registros: any = []
  public colunas: Array<ColunasFormulario> = [
    {
      valor: 'nome',
      visualizacao: 'Nome'
    },
    {
      valor: 'cnpj',
      visualizacao: 'CNPJ'
    }
  ] 

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _location: Location,
              private _clienteService: ClienteService,
              private _snackBar: MatSnackBar,
              private _cadastroService: CadastroService) {

      this.registros = this._route.snapshot.data.resolveTabelaCliente.clientes; 
  
  }

  public alterar(cliente): void{
    this._router.navigate([this.routes.CRUD_CLIENTE], { state: { cliente: cliente } });
  }
  
  public adicionarCliente(): void{
    this._router.navigate([this.routes.CRUD_CLIENTE]);
  }

  async delete(cliente): Promise<void>{

    await this._clienteService.delete(cliente.id)
      .toPromise()
      .then(r => {
        this.mostrarMensagem(r)
        this.registros = this.registros.filter(r => r.id != cliente.id)
      })
      .catch(e => this.mostrarErros(e))

  }

  public mostrarErros(e): void{
    if(e.error){
      var erros = <Array<string>> (Object.values(e.error.errors))  
      for(let i = 0; i < erros.length; i++){
        this._snackBar.open(erros[i], 'Fechar');
      }
    } else {
      this._snackBar.open(e.message, 'Fechar');
    } 
  }

  public mostrarMensagem(r): void{
    this._snackBar.open(r.data, 'Fechar');    
  }
  

}
