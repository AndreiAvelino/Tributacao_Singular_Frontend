import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './cadastro.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CadastroRoutingModule } from './cadastro-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import { CrudClienteComponent } from './crud-cliente/crud-cliente.component';
import { TabelaClienteComponent } from './tabela-cliente/tabela-cliente.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TabelaUsuarioComponent } from './tabela-usuario/tabela-usuario.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PipesModule } from 'src/app/pipes/pipes.module';

const materialModules = [
  MatInputModule,
  MatFormFieldModule,
  MatRadioModule,
  MatCardModule,
  MatButtonModule,
  MatSnackBarModule
]

const routeModules = [
  RouterModule,
  CadastroRoutingModule,
]

const internalComponents = [
  CadastroComponent,
  UsuarioComponent,
  CrudClienteComponent,
  TabelaClienteComponent    
]

@NgModule({
  declarations: [
    ...internalComponents,
    TabelaUsuarioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    ...routeModules,
    ...materialModules
  ]
})
export class CadastroModule { }
