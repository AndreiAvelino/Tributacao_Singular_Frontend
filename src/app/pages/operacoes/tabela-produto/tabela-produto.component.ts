import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ColunasFormulario } from 'src/app/models/ColunasFormulario';
import { ConfirmPageComponent } from 'src/app/shared/confirm-page/confirm-page.component';
import { roles } from 'src/consts';
import { routes } from 'src/consts/routes';
import { LocalStorageService } from 'src/services/local-storage.service';
import { ProdutoService } from 'src/services/produto.service';
import { SuperTableService } from 'src/services/super-table.service';

@Component({
  selector: 'app-tabela-produto',
  templateUrl: './tabela-produto.component.html',
  styleUrls: ['./tabela-produto.component.scss']
})
export class TabelaProdutoComponent implements OnInit {

  public showAlterar: boolean = true;
  public showExcluir: boolean = true;
  public showAuxUm: boolean = true;

  private routes = routes
  private role: string;
  public linhasSelecionadas = []
  public registros: Array<any> = [];
  public colunas: Array<ColunasFormulario> = [
    {
      valor: 'ncm',
      visualizacao: 'NCM'
    },
    {
      valor: 'ean',
      visualizacao: 'EAN'
    },
    {
      valor: 'descricao',
      visualizacao: 'Descrição'
    },
    {
      valor: 'status',
      visualizacao: 'Status'
    },
  ]
  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _dialog: MatDialog,
              private _produtoService: ProdutoService,
              private _superTable: SuperTableService,
              private _snackBar: MatSnackBar,
              private _localStorage: LocalStorageService) {
    this.registros = this._route.snapshot.data.resolveProdutos.produtos; 
  }

  ngOnInit(): void {
    this.set_permissions();
    this.set_layout();
  }

  public alterar(produto): void{
    this._router.navigate([this.routes.CRUD_PRODUTO], { state: { produto: produto } });
  }

  async delete(produto): Promise<void>{
    const dialogConfig = new MatDialogConfig();
    var resposta;

    dialogConfig.data = {
      titulo: "Sistema informa",
      mensagem: "Deseja excluir o produto?"
    }

    await this._dialog.open(ConfirmPageComponent, dialogConfig)
      .afterClosed()
      .toPromise()
      .then(r => resposta = r)

    if(resposta)
      await this._produtoService.delete(produto.id)
        .toPromise()
        .then(r => {
          this.mostrarMensagem(r)
          this.registros = this.registros.filter(registro => registro.id != produto.id)
        })
        .catch(e => this.mostrarErros(e))

  }

  public set_role(){
    this.role = this.role = this._localStorage.get("user").userToken.claims[0].type
  }
  
  public set_permissions(){

    this.set_role();

    if(this.role == roles.TRIBUTARISTA)
      this.showExcluir = false;
    
    if(this.role == roles.CLIENTE){
      this.showAlterar = false;      
    }
          

  }

  public set_layout(): void{ 

    if(this.registros.map(registro => registro.status).filter(registro => registro == 1).length > 0){

      if(this.role == roles.CLIENTE){

        this.colunas.unshift(
          {
            valor: 'select',
            visualizacao: 'select'
          }
        )
      }

    } else  {

      if(this.colunas.map(coluna => coluna.valor).includes('select')){
        this.colunas.shift();
      }

      this.showAuxUm = false
    }
  }

  public adicionarProduto(): void{
    this._router.navigate([this.routes.ADICIONAR_LISTA_PRODUTO]);
  }

  public mostrarManipularProduto(): boolean{
    return this._localStorage.get_user_role() == roles.CLIENTE ? true : false
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

  async revisar(): Promise<void>{

    let erro: boolean

    for(let i = 0; i < this.linhasSelecionadas.length; i++){
      this.linhasSelecionadas[i].status = 2

      await this._produtoService.put(this.linhasSelecionadas[i])
        .toPromise()
        .then()
        .catch(() => erro = true)

    }

    if(erro){
      this._snackBar.open("Ocorreu um erro", 'Fechar');
    } else {
      this._snackBar.open("Atualização feita com sucesso!", 'Fechar');

      for(let i = 0; i < this.registros.length; i++){

        if(this.linhasSelecionadas.includes(this.registros[i])){
          this.registros[i].status = 2
        }

      }

      this.resetar()

    }

  }

  public resetar(): void{

    this._superTable.resetar()

    this.set_layout();

  }

  public mudarSelecionados(selecionados): void{
    this.linhasSelecionadas = selecionados
  }
 
}
