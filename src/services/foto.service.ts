import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FotoUsuario } from 'src/app/pages/global/foto-perfil/foto-perfil.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  private url: string = environment.url;

  constructor(private _http: HttpClient) { }

  public get(idUsuario: string): Observable<any> {
    return this._http.get(`${this.url}api/Foto/Obter-Por-Id/${idUsuario}`)
  }

  public post(fotoUsuario: FotoUsuario): Observable<any> {
    const formData = new FormData();
    formData.append("Id", fotoUsuario.Id.toString());
    formData.append("idUsuario", fotoUsuario.idUsuario.toString());
    formData.append("Src", fotoUsuario.Src, fotoUsuario.Src.name);
    return this._http.post<any>(`${this.url}api/Foto/Adicionar`, formData, { reportProgress: true, observe: 'events', responseType: 'json' })
  }

  // public put(fotoUsuario): Observable<any>{
  //   //return this._http.put(`${this.url}api/Foto​/Atualizar/${formulario.id}`, formulario)

  //   const formData = new FormData();
  //   formData.append("Id", fotoUsuario.Id.toString());
  //   formData.append("idUsuario", fotoUsuario.idUsuario.toString());
  //   formData.append("Src", fotoUsuario.Src, fotoUsuario.Src.name);
  //   return this._http.post<any>(`${this.url}api/Foto/Atualizar`, formData, { reportProgress: true, observe: 'events', responseType: 'json' })
  // }

  public delete(id): Observable<any>{
    return this._http.delete(`${this.url}api/Foto/Remover/${id}`)
  }
  
}
