import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input('item') item
  public showSubmenu: boolean = false;
  public isShowing = false;

  constructor() { }

  ngOnInit(): void {
  }

}
