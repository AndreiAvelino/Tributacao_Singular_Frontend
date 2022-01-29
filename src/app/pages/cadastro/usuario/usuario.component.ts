import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from 'src/services/cadastro.service';

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

  constructor(private _formBuilder: FormBuilder,
              private _cadastroService: CadastroService) { }

  ngOnInit(): void {

    this.formulario = this._formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
      role: ["", [Validators.required]]
    })
  
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
        .then(r => console.log(r))
        .catch(e => console.log(e))
    else
      this._cadastroService.post_tributarista(usuario)
        .toPromise()
        .then(r => console.log(r))
        .catch(e => console.log(e))

  }


}
