import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/services/categoria.service';

@Component({
  selector: 'app-crud-categoria',
  templateUrl: './crud-categoria.component.html',
  styleUrls: ['./crud-categoria.component.scss']
})
export class CrudCategoriaComponent{

  public formulario: FormGroup
  public categoria;
  public cadastro: boolean = true

  constructor(private _categoriaService: CategoriaService,
              private _formBuilder: FormBuilder,
              private _router: Router,
              private _snackBar: MatSnackBar,
              private _location: Location) {

                this.criar_formulario(); 
                this.preencher_formulario();
             
              }

  //#region MÉTODOS RELATIVOS AO FORMULÁRIO

  public criar_formulario(): void{
    this.formulario = this._formBuilder.group({
      id: ['00000000-0000-0000-0000-000000000000'],
      descricao: ["", Validators.required],
      icms: [0, Validators.required],
      cofins: [0, Validators.required],
      ipi: [0, Validators.required]
    })
  }

  public preencher_formulario(): void{

    var categoria;

    if(this._router.getCurrentNavigation().extras.state){
      categoria = this._router.getCurrentNavigation().extras.state.categoria
      this.cadastro = false
    }      

    if(categoria){
      this.formulario.patchValue({
        id: categoria.id,
        descricao: categoria.descricao,
        icms: categoria.icms,
        cofins: categoria.cofins,
        ipi: categoria.ipi
      })
    }
  }

  //#endregion

  //#region MÉTODOS DE CRUD

  public post(): void{

    this._categoriaService.post(this.formulario.value)
      .toPromise()
      .then(r => {
        this.mostrarMensagem(r)
        this.voltar()
      })
      .catch(e => this.mostrarErros(e))
  }

  public put(): void{

    this._categoriaService.put(this.formulario.value)
      .toPromise()
      .then(r => {
        this.mostrarMensagem(r)
        this.voltar()
      })
      .catch(e => this.mostrarErros(e))
  }

  public delete(): void{

    this._categoriaService.delete(this.formulario.value.id)
      .toPromise()
      .then(r => {
        this.mostrarMensagem(r)
        this.voltar()
      })
      .catch(e => this.mostrarErros(e))

  }
 
 //#endregion

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
    if(typeof(r.data) == 'string'){
      this._snackBar.open(r.data, 'Fechar');   
    } else {
      this._snackBar.open("Operação realizada com sucesso", 'Fechar');   
    }  
  }
 

}
