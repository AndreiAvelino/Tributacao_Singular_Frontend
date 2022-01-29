import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url: string = environment.url;

  constructor(private _http: HttpClient) { }

  public get(id: string): Observable<any> {
    return this._http.get(`${this.url}api/Cliente/Obter-Por-Id/${id}`)
  }

  public get_all(): Observable<any> {
    return this._http.get(`${this.url}api/Cliente/Obter-Todos`)
  }

  public put(formulario): Observable<any>{
    return this._http.put(`${this.url}api/Cliente/Atualizar/${formulario.id}`, formulario)
  }

  public delete(id): Observable<any>{
    console.log(id)
    return this._http.delete(`${this.url}api/Cliente/Remover/${id}`)
  }
}
