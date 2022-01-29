import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private url: string = environment.url;

  constructor(private _http: HttpClient) { }

  public get(id: string): Observable<any> {
    return this._http.get(`${this.url}api/Produto/Obter-Por-Id/${id}`)
  }

  public get_all(): Observable<any> {
    return this._http.get(`${this.url}api/Produto/Obter-Todos`)
  }

  public post(formulario): Observable<any>{

    console.log(formulario)

    return this._http.post(`${this.url}api/Produto/Adicionar`, formulario)
  }

  public put(formulario): Observable<any>{

    console.log(formulario)

    return this._http.put(`${this.url}api/Produto/Atualizar/${formulario.id}`, formulario)
  }

  public delete(id): Observable<any>{
    console.log(id)
    return this._http.delete(`${this.url}api/Produto/Remover/${id}`)
  }

}
