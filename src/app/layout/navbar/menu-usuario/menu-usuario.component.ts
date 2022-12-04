import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/consts/routes';
import { LocalStorageService } from 'src/services/local-storage.service';

@Component({
  selector: 'menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.scss']
})
export class MenuUsuarioComponent implements OnInit {

  constructor(
    private _localStorage: LocalStorageService,
    private _router: Router
  ){}

  ngOnInit(): void {
  }

  public sair(){
    this._localStorage.clear();
    this._router.navigate([routes.LOGIN])
  }

  public mudar_foto(){
    this._router.navigate([routes.FOTO_PERFIL])
  }

}
