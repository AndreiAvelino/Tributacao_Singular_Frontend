import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SimpleTableComponent } from 'src/app/shared/simple-table/simple-table.component';
import { roles } from 'src/consts';
import { CategoriaService } from 'src/services/categoria.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import { ProdutoService } from 'src/services/produto.service';

@Component({
  selector: 'app-crud-produto',
  templateUrl: './crud-produto.component.html',
  styleUrls: ['./crud-produto.component.scss']
})
export class CrudProdutoComponent implements OnInit, AfterViewInit {

  public formulario: FormGroup
  public produto
  public listaProdutosAdicionar;
  public role = this._localStorage.get_user_role();

  constructor(private _produtoService: ProdutoService,
              private _categoriaService: CategoriaService,
              private _localStorage: LocalStorageService,
              private _formBuilder: FormBuilder,
              private _router: Router,
              private _dialog: MatDialog,
              private _location: Location) {

                this.criar_formulario(); 
                this.preencher_formulario();

              }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
  }

    //#region MÉTODOS RELATIVOS AO FORMULÁRIO

    public criar_formulario(): void{
      
      this.formulario = this._formBuilder.group({
        id: [""],
        ncm: [{value: '', disabled: this.role == roles.TRIBUTARISTA ? true : false}, Validators.required],
        ean: [{value: '', disabled: this.role == roles.TRIBUTARISTA ? true : false}, Validators.required],
        descricao: [{value: '', disabled: this.role == roles.TRIBUTARISTA ? true : false}, Validators.required],
        status: [{value: '', disabled: this.role == roles.TRIBUTARISTA ? true : false}, Validators.required],
        categoria: [''],
        categoriaId: ["", Validators.required],
        clienteId: ["", Validators.required]
      })
    }
  
    async preencher_formulario(): Promise<void>{
  
      var categoria
  
      if(this._router.getCurrentNavigation().extras.state)
        this.produto = this._router.getCurrentNavigation().extras.state.produto

      await this._categoriaService.get(this.produto.categoriaId)
        .toPromise()
        .then(r => categoria = r.data.descricao)
  
      if(this.produto){
        this.formulario.patchValue({
          id: this.produto.id,
          ncm: this.produto.ncm,
          ean: this.produto.ean,
          descricao: this.produto.descricao,
          status: this.produto.status,
          categoriaId: this.produto.categoriaId,
          categoria: categoria,
          clienteId: this.produto.clienteId
        })
      }
    }
  
    //#endregion
  
    //#region MÉTODOS DE CRUD
  
    public post(): void{
      // this._produtoService.post(this.formulario.value)
    }

    public put(): void{
      this._produtoService.put(
        {
          id: this.formulario.value.id,
          ncm: this.produto.ncm,
          ean: this.produto.ean,
          descricao: this.produto.descricao,
          status: 1,
          categoriaId: this.formulario.value.categoriaId,
          clienteId: this.formulario.value.clienteId
        }
      )
      .toPromise()
      .then(r => console.log(r))
      .catch(e => console.log(e))
    }
    
   //#endregion

   public AbrirCaixaArquivos() {
    document.getElementById('selectFiles').click();
  }

  async ArquivosSelecionados(arquivos: any) {
    console.log(arquivos)
    var reader = new FileReader();
    reader.readAsText(arquivos.target.result);
  }

  public upload(){
  
    var files = (<HTMLInputElement>document.getElementById('selectFiles')).files;
      
    if (files.length <= 0) {
      return false;
    }
  
    var fr = new FileReader();

    console.log(this._localStorage.get_user_id())

    fr.onload = e => {
      console.log(e.target.result)
      let result = JSON.parse(<string> e.target.result);

      for(let i = 0; i < result.length; i++){
        result[i]['id'] = '00000000-0000-0000-0000-000000000000'
        result[i]['clienteId'] = this._localStorage.get_user_id()
        result[i]['categoriaId'] = '00000000-0000-0000-0000-000000000000'
      }

      this.listaProdutosAdicionar = result;
      console.log(this.listaProdutosAdicionar)

      this._produtoService.post({
        produtoViewModels: this.listaProdutosAdicionar
      })
        .toPromise()
        .then(r => console.log(r))
        .catch(e => console.log(e))
    }
  
    
  
    fr.readAsText(files.item(0));
  };

  public removerCategoria(): void{
    this.formulario.patchValue({
      categoriaId: "",
      categoria: ""
    })
  }

  async procurarCategoria(): Promise<void>{

    let categorias
    const dialogConfig = new MatDialogConfig();
    
    await this._categoriaService.get_all()
      .toPromise()
      .then(r => categorias = r.data)

    console.log(categorias)
  
    dialogConfig.height = '400px';
    dialogConfig.data = {
      //registros: categorias
      registros: categorias,
      colunas: [
        {
          valor: 'descricao',
          visualizacao: 'Categoria'
        }
      ]
    }

    this._dialog.open(SimpleTableComponent, dialogConfig)
      .afterClosed()
      .toPromise()
      .then(r => this.adicionarCategoria(r))    

  }

  public adicionarCategoria(categoria): void{
    this.formulario.patchValue({
      categoria: categoria.descricao,
      categoriaId: categoria.id
    })
  }
  
  public voltar(): void{
    this._location.back();
  }

 

}
