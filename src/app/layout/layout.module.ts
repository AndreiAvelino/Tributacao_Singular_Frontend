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


const MaterialModules = [
  MatButtonModule,
  MatIconModule,
  MatToolbarModule
]

@NgModule({
  declarations: [
    LayoutComponent, 
    NavbarComponent, 
    FooterComponent, 
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ...MaterialModules
  ],
  exports:[
    LayoutComponent
  ]
})
export class LayoutModule { }
