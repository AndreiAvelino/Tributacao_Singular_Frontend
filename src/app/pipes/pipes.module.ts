import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusPipe } from './status.pipe';
import { CnpjPipe } from './cnpj.pipe';



@NgModule({
  declarations: [
    StatusPipe,
    CnpjPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StatusPipe,
    CnpjPipe
  ]
})
export class PipesModule { }
