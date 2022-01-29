import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/services/local-storage.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formulario: FormGroup

  constructor(private _formBuilder: FormBuilder,
              private _loginService: LoginService,
              private _localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.formulario = this._formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
  }

  public login(): void{
    this._loginService.login(this.formulario.value)
  }

}
