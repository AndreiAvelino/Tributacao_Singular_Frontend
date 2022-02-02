import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
              private _snackBar: MatSnackBar,
              private _cadastroService: CadastroService) {
    this.registros = this._route.snapshot.data.resolveTabelaUsuario.usuarios; 

  }

  ngOnInit(): void {
  }

  public alterar(usuario): void{
    this._router.navigate([this.routes.CADASTRO_USUARIO], { state: { usuario: usuario } });
  }

  public delete(usuario): void{
    this._cadastroService.delete(usuario.id)
      .toPromise()
      .then(r => {
        this.mostrarMensagem(r)
        this.registros = this.registros.filter(r => r.id != usuario.id)
      })
      .catch(e => this.mostrarErros(e))
  }
  
  public adicionar(): void{
    this._router.navigate([this.routes.CADASTRO_USUARIO]);
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
