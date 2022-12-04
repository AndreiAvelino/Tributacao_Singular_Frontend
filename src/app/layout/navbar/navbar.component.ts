import { Component, OnInit } from '@angular/core';
import { page } from '../../../consts/page'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public page = page;

  constructor() { }

  ngOnInit(): void {
  }

  public changeSidenav():  void {
    this.page.SIDENAV_STATE = !this.page.SIDENAV_STATE;
  }


}
