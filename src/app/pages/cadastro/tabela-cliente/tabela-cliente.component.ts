import { Component, OnInit } from '@angular/core';
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
    },
    {
      valor: 'email',
      visualizacao: 'E-mail'
    },
  ] 

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _clienteService: ClienteService,
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
      .then(r => console.log(r))
      .catch(e => console.log(e))

  }
  

}
