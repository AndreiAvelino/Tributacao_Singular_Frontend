import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { PrincipalComponent } from './principal/principal.component';
import { GlobalModule } from './global/global.module';



@NgModule({
  declarations: [
    PagesComponent,
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    GlobalModule,
    MatExpansionModule,
    MatIconModule
  ],
  exports: [
    PagesComponent,
    PrincipalComponent
  ]
})
export class PagesModule { }
