import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url: string = environment.url;

  constructor(private _http: HttpClient) { }

  public get(id: string): Observable<any> {
    return this._http.get(`${this.url}api/Categoria/Obter-Por-Id/${id}`)
  }

  public get_all(): Observable<any> {
    console.log("get aloo entrou")
    return this._http.get(`${this.url}api/Categoria/Obter-Todos`)
  }

  public post(formulario): Observable<any>{
    return this._http.post(`${this.url}api/Categoria/Adicionar`, formulario)
  }

  public put(formulario): Observable<any>{
    return this._http.put(`${this.url}api/Categoria/Atualizar/${formulario.id}`, formulario)
  }

  public delete(id): Observable<any>{
    return this._http.delete(`${this.url}api/Categoria/Remover/${id}`)
  }


}
