import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/consts/routes';
import { FotoService } from 'src/services/foto.service';
import { LocalStorageService } from 'src/services/local-storage.service';

@Component({
  selector: 'menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.scss']
})
export class MenuUsuarioComponent implements OnInit {

  public fotoPerfil: String = "";

  constructor(
    private _localStorage: LocalStorageService,
    private _router: Router,
    private fotoUsuarioService: FotoService
  ){}

  ngOnInit(): void {
    this.RecuperarFoto();
  }

  public sair(){
    this._localStorage.clear();
    this._router.navigate([routes.LOGIN])
  }

  public mudar_foto(){
    this._router.navigate([routes.FOTO_PERFIL])
  }

  public RecuperarFoto(): void {
    this.fotoUsuarioService.get(this._localStorage.get_user_id()).toPromise()
      .then(r => {
        if(r.data){
          this.fotoPerfil = "data:image/png;base64," + r.data.src
        }
      })
  }
}
