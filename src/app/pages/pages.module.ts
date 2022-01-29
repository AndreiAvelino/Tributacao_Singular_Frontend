import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';



@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
