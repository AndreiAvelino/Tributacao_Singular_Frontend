import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from 'src/services/local-storage.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formulario: FormGroup
  public logando: boolean = false;

  constructor(private _formBuilder: FormBuilder,
              private _loginService: LoginService,
              private _localStorage: LocalStorageService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.formulario = this._formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
  }

  async login(): Promise<void>{

    if(this.formulario.status == 'VALID'){
      this.logando = true
      await this._loginService.login(this.formulario.value)      
        .toPromise()
        .then(r => {
          this._loginService.setOnLocalStorage(r.data)
          this._loginService.redirect();
        })
        .catch(e => this.mostrarErros(e))
    }

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

    this.logando = false
  }

}
