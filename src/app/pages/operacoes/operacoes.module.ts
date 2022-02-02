import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaCategoriaComponent } from './tabela-categoria/tabela-categoria.component';
import { OperacoesComponent } from './operacoes.component';
import { RouterModule } from '@angular/router';
import { OperacoesRoutingModule } from './operacoes-routing.module';

import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { CrudCategoriaComponent } from './crud-categoria/crud-categoria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabelaProdutoComponent } from './tabela-produto/tabela-produto.component';
import { CrudProdutoComponent } from './crud-produto/crud-produto.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { AdicionarArquivoProdutoComponent } from './adicionar-arquivo-produto/adicionar-arquivo-produto.component';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PipesModule } from 'src/app/pipes/pipes.module';


const materialModules = [
  MatIconModule,
  MatInputModule, 
  MatPaginatorModule,    
  MatSortModule,
  MatTableModule,
  MatDialogModule,
  MatTabsModule,
  MatButtonModule,
  MatCardModule,
  MatSnackBarModule
]


@NgModule({
  declarations: [
    TabelaCategoriaComponent, 
    OperacoesComponent, 
    CrudCategoriaComponent, 
    TabelaProdutoComponent,
    CrudProdutoComponent,
    AdicionarArquivoProdutoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    OperacoesRoutingModule,
    SharedModule,
    PipesModule,
    ...materialModules
  ]
})
export class OperacoesModule { }
