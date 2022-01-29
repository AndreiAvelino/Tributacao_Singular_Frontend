import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ColunasFormulario } from 'src/app/models/ColunasFormulario';
import { Categoria } from 'src/app/pages/operacoes/tabela-categoria/tabela-categoria.component';

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

  public colunasExibidas = []

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngOnInit(): void {

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
}
