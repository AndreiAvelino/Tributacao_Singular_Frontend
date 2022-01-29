import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { SidebarComponent } from './sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
// import { NavbarComponent } from '../navbar/navbar.component';

const MaterialModules = [
  MatSidenavModule,
  MatIconModule,
  MatListModule,
]

@NgModule({
  declarations: [
    SidebarComponent,
    MenuItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    // NavbarComponent,
    ...MaterialModules
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
