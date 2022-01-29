import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ColunasFormulario } from 'src/app/models/ColunasFormulario';
import { ConfirmPageComponent } from 'src/app/shared/confirm-page/confirm-page.component';
import { roles } from 'src/consts';
import { routes } from 'src/consts/routes';
import { LocalStorageService } from 'src/services/local-storage.service';
import { ProdutoService } from 'src/services/produto.service';

@Component({
  selector: 'app-tabela-produto',
  templateUrl: './tabela-produto.component.html',
  styleUrls: ['./tabela-produto.component.scss']
})
export class TabelaProdutoComponent implements OnInit {

  public showAlterar: boolean = true;
  public showExcluir: boolean = true;

  private routes = routes
  private role: string;
  public registros;
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
              private _localStorage: LocalStorageService) {
    this.registros = this._route.snapshot.data.resolveProdutos.produtos; 
    console.log(this.registros)
  }

  ngOnInit(): void {
    this.set_permissions();
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
        .then(r => console.log(r))
        .catch(e => console.log(e))

  }

  public set_role(){
    this.role = this.role = this._localStorage.get("user").userToken.claims[0].type
  }
  
  public set_permissions(){

    this.set_role();

    if(this.role == roles.TRIBUTARISTA)
      this.showExcluir = false;
    
    if(this.role == roles.CLIENTE)
      this.showAlterar = false;    

  }

  public adicionarProduto(): void{
    this._router.navigate([this.routes.ADICIONAR_LISTA_PRODUTO]);
  }

  public mostrarAdicionarProduto(): boolean{
    return this._localStorage.get_user_role() == roles.CLIENTE ? true : false
  }

}
