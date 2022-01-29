import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ColunasFormulario } from 'src/app/models/ColunasFormulario';
import { ConfirmPageComponent } from 'src/app/shared/confirm-page/confirm-page.component';
import { routes } from 'src/consts/routes';
import { CategoriaService } from 'src/services/categoria.service';

export interface Categoria {
  id: string;
  descricao: string;
  icms: number;
  cofins: number;
  ipi: number;
}

@Component({
  selector: 'app-categoria',
  templateUrl: './tabela-categoria.component.html',
  styleUrls: ['./tabela-categoria.component.scss']
})
export class TabelaCategoriaComponent implements OnInit {

  private routes = routes
  public registros;
  public colunas: Array<ColunasFormulario> = [
    {
      valor: "descricao",
      visualizacao: "Descrição",
    },
    {
      valor: "icms",
      visualizacao: "ICMS",
    },
    {
      valor: "cofins",
      visualizacao: "COFINS",
    },
    {
      valor: "ipi",
      visualizacao: "IPI",
    },
  ]


  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _dialog: MatDialog,
              private _categoriaService: CategoriaService) {
    this.registros = this._route.snapshot.data.resolveCategorias.categorias; 
    console.log(this.registros)
  }

  

  ngOnInit(): void {
  }

  public alterar(categoria): void{
    this._router.navigate([this.routes.CRUD_CATEGORIA], { state: { categoria: categoria } });
  }

  async delete(categoria): Promise<void>{
    const dialogConfig = new MatDialogConfig();
    var resposta;

    dialogConfig.data = {
      titulo: "Sistema informa",
      mensagem: "Deseja excluir a categoria?"
    }

    await this._dialog.open(ConfirmPageComponent, dialogConfig)
      .afterClosed()
      .toPromise()
      .then(r => resposta = r)


    if(resposta)
      await this._categoriaService.delete(categoria.id)
        .toPromise()
        .then(r => console.log(r))
        .catch(e => console.log(e))

  }

  public adicionarCategoria(){
    this._router.navigate([this.routes.CRUD_CATEGORIA]);
  }

}
