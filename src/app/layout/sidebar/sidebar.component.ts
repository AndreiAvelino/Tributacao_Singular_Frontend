import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { menu } from 'src/consts';
import { LocalStorageService } from 'src/services/local-storage.service';
import { page } from '../../../consts/page'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public page = page;
  public menuUsuario

  constructor(private _localStorage: LocalStorageService) { }

  ngOnInit(): void {

    menu.default()
    this.menuUsuario = menu.valores

    this.menuUsuario.forEach(modulo => {
      if(modulo.submenu){
        modulo.submenu = modulo.submenu.filter(componente => componente.roles.includes(this._localStorage.get_user_role()))
        
        if(modulo.submenu.length == 0){
          modulo.submenu = null;
        }
      }
    })
   
  }

  @ViewChild('sidenav') sidenav: MatSidenav;

  reason = '';

}
