import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { SidebarModule } from './sidebar/sidebar.module';
import { MenuUsuarioComponent } from './navbar/menu-usuario/menu-usuario.component';
import {MatMenuModule} from '@angular/material/menu';
import { AvatarModule } from 'ngx-avatar';


const MaterialModules = [
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatMenuModule
]

@NgModule({
  declarations: [
    LayoutComponent, 
    NavbarComponent, 
    FooterComponent,
    MenuUsuarioComponent, 
  ],
  imports: [
    CommonModule,
    SidebarModule,
    AvatarModule,
    ...MaterialModules
  ],
  exports:[
    LayoutComponent
  ]
})
export class LayoutModule { }
