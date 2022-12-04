import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputImagemComponent } from './input-imagem/input-imagem.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

const materialModules = [
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatRadioModule
]

@NgModule({
  declarations: [
    InputImagemComponent
  ],
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: [
    InputImagemComponent
  ]
})
export class InputsModule { }
