import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private url: string = environment.url;

  constructor(private _http: HttpClient) { }

  public post_administrador(formulario): Observable<any>{
    return this._http.post(`${this.url}nova-conta-Administrador`, formulario)
  }

  public post_tributarista(formulario): Observable<any>{
    return this._http.post(`${this.url}nova-conta-Tributarista`, formulario)
  }

  public post_cliente(formulario): Observable<any>{
    return this._http.post(`${this.url}nova-conta-Cliente`, formulario)
  }

  public obter_todos(id): Observable<any>{
    return this._http.get(`${this.url}Obter-Todos/${id}`)
  }

  public put(formulario): Observable<any>{
    return this._http.put(`${this.url}Atualizar/${formulario.id}`, formulario)
  }
  
  public delete(id): Observable<any>{
    return this._http.delete(`${this.url}Remover/${id}`)
  }
}
