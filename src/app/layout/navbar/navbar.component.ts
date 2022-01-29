import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/consts/routes';
import { LocalStorageService } from 'src/services/local-storage.service';
import { page } from '../../../consts/page'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public page = page;

  constructor(private _localStorage: LocalStorageService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  public changeSidenav():  void {
    this.page.SIDENAV_STATE = !this.page.SIDENAV_STATE;
  }

  public sair(){
    this._localStorage.clear();
    this._router.navigate([routes.LOGIN])
  }

}
