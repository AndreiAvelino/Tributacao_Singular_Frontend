import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ColunasFormulario } from 'src/app/models/ColunasFormulario';
import { Categoria } from 'src/app/pages/operacoes/tabela-categoria/tabela-categoria.component';
import { SuperTableService } from 'src/services/super-table.service';

@Component({
  selector: 'super-table',
  templateUrl: './super-table.component.html',
  styleUrls: ['./super-table.component.scss']
})
export class SuperTableComponent implements OnInit, AfterViewInit {
 
  @Input('colunas') colunas
  @Input('registros') registros;
  @Input('showAlterar') showAlterar = true;
  @Input('showExcluir') showExcluir = true;
  @Output() btnPutClick = new EventEmitter();
  @Output() btnDeleteClick = new EventEmitter();
  @Output() selecionados = new EventEmitter();

  public colunasExibidas = []
  private selection = new SelectionModel<[]>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _superTable: SuperTableService){}


  ngOnInit(): void {

    this._superTable.reset
      .subscribe(() => this.selection.clear())

    if(this.showAlterar){
      this.colunas.push({
        valor: 'alterar',
        visualizacao: 'Alterar'
      })
    }
  
    if(this.showExcluir){
      this.colunas.push({
        valor: 'excluir',
        visualizacao: 'Excluir'
      })
    }

    this.colunasExibidas = this.colunas.map(v => v.valor)
  }

  ngAfterViewInit() {
    this.registros = new MatTableDataSource<Categoria>(this.registros); 
    this.registros.paginator = this.paginator;
    this.registros.sort = this.sort;

    this.selection.changed.subscribe(() => this.emitirSelecionados())
  }

  public filtrar(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.registros.filter = valor.trim().toLowerCase();

    if (this.registros.paginator) {
      this.registros.paginator.firstPage();
    }
  }

  public clickDelete(event){
    this.btnDeleteClick.emit(event)
  }

  public clickPut(event){
    this.btnPutClick.emit(event)
  }


  public retornaColunas(){
    return this.colunas.map(v => v.valor)
  }  

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.registros.data.filter(v => v.status == 1).length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.registros.data.filter(v => v.status == 1));
  }

  public emitirSelecionados(){
    this.selecionados.emit(this.selection.selected)
  }
}
