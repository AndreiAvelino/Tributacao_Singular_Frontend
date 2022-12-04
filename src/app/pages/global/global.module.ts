import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FotoPerfilComponent } from './foto-perfil/foto-perfil.component';
import { InputsModule } from 'src/inputs/inputs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [FotoPerfilComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ]
})
export class GlobalModule { }
