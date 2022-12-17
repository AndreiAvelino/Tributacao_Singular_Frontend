import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { routes } from 'src/consts/routes';
import { ConfirmedValidator } from 'src/form-validations/confirmed-validator';
import { FormValidations } from 'src/form-validations/form-validations';
import { CadastroService } from 'src/services/cadastro.service';
import { ClienteService } from 'src/services/cliente.service';


@Component({
  selector: 'app-crud-cliente',
  templateUrl: './crud-cliente.component.html',
  styleUrls: ['./crud-cliente.component.scss']
})
export class CrudClienteComponent implements OnInit {

  public formulario: FormGroup
  public cadastrar: boolean = true;

  constructor(private _formBuilder: FormBuilder,
              private _cadastroService: CadastroService,
              private _clienteService: ClienteService,
              private _snackBar: MatSnackBar,
              private _router: Router,
              private _location: Location) {

                this.criar_formulario();               
                this.preencher_formulario()
              }

  ngOnInit(): void {}

  //#region MÉTODOS RELATIVOS AO FORMULÁRIO

  public criar_formulario(): void {
    this.formulario = this._formBuilder.group({
      id: [""],
      nome: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
      cnpj: ["", [Validators.required, FormValidations.cnpjValidator, FormValidations.cnpjFormat]],
      produtos: [[]]
    },
    { 
      validator: ConfirmedValidator('password', 'confirmPassword')
    })
  }

  public preencher_formulario(): void{

    var cliente;

    if(this._router.getCurrentNavigation().extras.state){
      cliente = this._router.getCurrentNavigation().extras.state.cliente
      this.cadastrar = false;
    }

    if(cliente){
      this.formulario.patchValue({
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email,
        cnpj: cliente.cnpj,
        password: cliente.password,
        confirmPassword: cliente.confirmPassword,
        produtos: cliente.produtos
      })
    }
  }

  //#endregion

  //#region MÉTODOS DE CRUD
  public post(): void{

    this._cadastroService.post_cliente(this.formulario.value)
      .toPromise()
      .then(r => {
        this.mostrarMensagem(r)
        this.voltar();
      })
      .catch(e => this.mostrarErros(e))
  }

  public put(): void{

    console.log(
      JSON.stringify(
        {
          id: this.formulario.value.id,
          nome: this.formulario.value.nome,
          cnpj: this.formulario.value.cnpj,
          produtos: this.formulario.value.produtos
        }
      )
    )
  
    this._clienteService.put(
      {
        id: this.formulario.value.id,
        nome: this.formulario.value.nome,
        cnpj: this.formulario.value.cnpj,
        produtos: this.formulario.value.produtos
      }
    )
      .toPromise()
      .then(r => {
        this.mostrarMensagem(r)
        this.voltar();
      })
      .catch(e => this.mostrarErros(e))
  }

  async delete(): Promise<void>{

    await this._clienteService.delete(this.formulario.value.id)
      .toPromise()
      .then(r => {
        this.mostrarMensagem(r)
        this.voltar();
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
