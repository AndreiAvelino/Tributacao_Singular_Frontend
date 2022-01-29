import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from 'src/services/cadastro.service';
import { ClienteService } from 'src/services/cliente.service';

@Component({
  selector: 'app-crud-cliente',
  templateUrl: './crud-cliente.component.html',
  styleUrls: ['./crud-cliente.component.scss']
})
export class CrudClienteComponent implements OnInit {

  public formulario: FormGroup

  constructor(private _formBuilder: FormBuilder,
              private _cadastroService: CadastroService,
              private _clienteService: ClienteService,
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
      cnpj: ["", [Validators.required]],
      produtos: [[]]
    })
  }

  public preencher_formulario(): void{

    var cliente;

    if(this._router.getCurrentNavigation().extras.state)
      cliente = this._router.getCurrentNavigation().extras.state.cliente

    console.log(cliente)

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

    console.log(this.formulario.value)

    this._cadastroService.post_cliente(this.formulario.value)
      .toPromise()
      .then(r => console.log(r))
      .catch(e => console.log(e))
  }

  public put(): void{
  
    this._clienteService.put(
      {
        id: this.formulario.value.id,
        nome: this.formulario.value.nome,
        cnpj: this.formulario.value.cnpj,
        produtos: this.formulario.value.produtos
      }
    )
      .toPromise()
      .then(r => console.log(r))
      .catch(e => console.log(e))
  }

  async delete(): Promise<void>{

    await this._clienteService.delete(this.formulario.value.id)
      .toPromise()
      .then(r => console.log(r))
      .catch(e => console.log(e))

  
      
  }
  //#endregion

  public voltar(): void{
    this._location.back();
  }
}
