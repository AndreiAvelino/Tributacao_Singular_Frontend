import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColunasFormulario } from 'src/app/models/ColunasFormulario';
import { CadastroService } from 'src/services/cadastro.service';
import { routes } from '../../../../consts/routes'

@Component({
  selector: 'app-tabela-usuario',
  templateUrl: './tabela-usuario.component.html',
  styleUrls: ['./tabela-usuario.component.scss']
})
export class TabelaUsuarioComponent implements OnInit {

  private routes = routes;
  public registros
  public colunas: Array<ColunasFormulario> = [
    {
      valor: 'email',
      visualizacao: 'E-mail'
    }
  ]

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _cadastroService: CadastroService) {
    this.registros = this._route.snapshot.data.resolveTabelaUsuario.usuarios; 
    console.log(this.registros)
  }

  ngOnInit(): void {
  }

  public alterar(usuario): void{
    this._router.navigate([this.routes.CADASTRO_USUARIO], { state: { usuario: usuario } });
  }

  public delete(usuario): void{
    this._cadastroService.delete(usuario.id)
      .toPromise()
      .then(r => console.log(r))
      .catch(e => console.log(e))
  }
  
  public adicionar(): void{
    this._router.navigate([this.routes.CADASTRO_USUARIO]);
  }

}
