import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
              private _snackBar: MatSnackBar,
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
        ncm: ['', Validators.required],
        ean: ['', Validators.required],
        descricao: ['', Validators.required],
        status: [''],
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
        .then(r => {
          this.mostrarMensagem(r)
          this.voltar()
        })
        .catch(e => this.mostrarErros(e))
    }
    
   //#endregion

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
  
    dialogConfig.maxHeight = '400px';
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

    if(categoria){

      this.formulario.patchValue({
        categoria: categoria.descricao,
        categoriaId: categoria.id,
      })

      if(this.produto.categoriaId != categoria.id){        
        this.formulario.patchValue({
          status: 1
        })
      }
      
    }
    
  }
  
  public voltar(): void{
    this._location.back();
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
