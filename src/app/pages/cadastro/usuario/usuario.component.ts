import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from 'src/services/cadastro.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormValidations } from 'src/form-validations/form-validations';
import { ConfirmedValidator } from 'src/form-validations/confirmed-validator';

interface Usuario{
  email: string,
  password: string,
  confirmPassword: string
}

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})

export class UsuarioComponent implements OnInit {

  public formulario: FormGroup = null;
  public cadastrar: boolean = true;

  constructor(private _formBuilder: FormBuilder,
              private _cadastroService: CadastroService,
              private _snackBar: MatSnackBar,
              private _router: Router,
              private _location: Location) 
  {
    this.criar_formulario()
    this.preencher_formulario();

  }

  ngOnInit(): void {}

  public criar_formulario(): void{
    this.formulario = this._formBuilder.group({
      id: [""],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required]],
      role: ["1"]
    },
    { 
      validator: ConfirmedValidator('password', 'confirmPassword')
    })
  }

  public preencher_formulario(): void{

    var usuario;

    if(this._router.getCurrentNavigation().extras.state){
      usuario = this._router.getCurrentNavigation().extras.state.usuario
      this.cadastrar = false;
    }

    if(usuario){
      this.formulario.patchValue({
        id: usuario.id,
        email: usuario.email
      })
    }
  }

  public post(): void{

    let usuario: Usuario = {
      email: this.formulario.value.email,
      password: this.formulario.value.password,
      confirmPassword: this.formulario.value.confirmPassword
    }   

    if(this.formulario.value.role == '1')
      this._cadastroService.post_administrador(usuario)
        .toPromise()
        .then(r => {
          this.mostrarMensagem(r)
          this.voltar();
        })
        .catch(e => this.mostrarErros(e))  
    else
      this._cadastroService.post_tributarista(usuario)
        .toPromise()
        .then(r => {
          this.mostrarMensagem(r)
          this.voltar();
        })
        .catch(e => this.mostrarErros(e))

  }

  public put(): void{

    this._cadastroService.put(
      {
        id: this.formulario.value.id,
        email: this.formulario.value.email,
        password: this.formulario.value.password
      }
    )
      .toPromise()
      .then(r => {
        this.mostrarMensagem(r)
        this.voltar();
      })
      .catch(e => this.mostrarErros(e))

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
    if(typeof(r.data) == 'string'){
      this._snackBar.open(r.data, 'Fechar');   
    } else {
      this._snackBar.open("Operação realizada com sucesso", 'Fechar');   
    }
  }


}
