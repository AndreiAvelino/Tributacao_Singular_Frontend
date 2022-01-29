import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { routes } from 'src/consts/routes';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = environment.url;
  private routes = routes

  constructor(private _http: HttpClient,
              private _localStorage: LocalStorageService,
              private _router: Router) { }

  async login(formulario): Promise<void>{
    
    await this._http.post<any>(`${this.url}entrar`, formulario).toPromise()
      .then(r => this.setOnLocalStorage(r.data))

    this.redirect();
  }

  private setOnLocalStorage(value){
    this._localStorage.set("user", value)
  }

  private redirect(){
    this._router.navigate([`../${routes.PRINCIPAL}`]).then(() => console.log("entrou"))
  }
}
