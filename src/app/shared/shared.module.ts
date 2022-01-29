import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudButtonsComponent } from './crud-buttons/crud-buttons.component';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { SuperTableComponent } from './super-table/super-table.component';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { SimpleTableComponent } from './simple-table/simple-table.component';
import {ConfirmPageComponent} from './confirm-page/confirm-page.component'
import { MatDialogModule } from '@angular/material/dialog';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { CardDefaultComponent } from './card-default/card-default.component';

const materialModules = [
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule, 
  MatPaginatorModule,    
  MatSortModule,
  MatTableModule,
  MatDialogModule,
  MatBottomSheetModule
]

@NgModule({
  declarations: [
    CrudButtonsComponent,
    SuperTableComponent,
    SimpleTableComponent,
    ConfirmPageComponent,
    CardDefaultComponent
  ],
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: [
    CrudButtonsComponent,
    SuperTableComponent,
    SimpleTableComponent,
    ConfirmPageComponent,
    CardDefaultComponent
  ]
})
export class SharedModule { }
