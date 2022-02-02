import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as echarts from 'echarts';
import { roles } from 'src/consts';
import { CategoriaService } from 'src/services/categoria.service';
import { LocalStorageService } from 'src/services/local-storage.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements AfterViewInit {

  public contas = []
  public produtos = []
  public clientes = []
  public categorias = []
  public role: string = this._localStorage.get_user_role();

  constructor(private _route: ActivatedRoute,
              private _localStorage: LocalStorageService) {
    this.produtos = this._route.snapshot.data.resolvePrincipal.produtos; 
    this.contas = this._route.snapshot.data.resolvePrincipal.contas; 
    this.clientes = this._route.snapshot.data.resolvePrincipal.clientes; 
    this.categorias = this._route.snapshot.data.resolvePrincipal.categorias; 
  }

  ngAfterViewInit(): void {

    switch(this.role){

      case roles.ADMINISTRADOR: this.geraGraficoUsuarios();
                                break;

      case roles.CLIENTE:       this.geraGraficoStatusProdutos();
                                break;

      case roles.TRIBUTARISTA:  this.geraGraficoStatusProdutos();
                                this.geraGraficoProdutosCategorias();
                                break;
    }

  }

  public geraGraficoUsuarios(): void{
    var elementoHTML = document.getElementById('usuariosXtipo');
    var grafico = echarts.init(elementoHTML);
    var configuracoes = {

    xAxis: {
      type: 'category',
      data: ['Clientes', 'Usuários']
    },
    yAxis: {
      type: 'value'
    },
    series: 
      [
        {
          data: [this.clientes.length, this.contas.length],
          type: 'bar'
        }
      ]
    };

    grafico.setOption(configuracoes);
  }

  public geraGraficoStatusProdutos(): void{

    var elementoHTML = document.getElementById('statusXprodutos');
    var grafico = echarts.init(elementoHTML);
    var configuracoes = {

    xAxis: {
      type: 'category',
      data: ['Pendente', 'Atualizado', 'Revisado']
    },
    yAxis: {
      type: 'value'
    },
    series: 
      [
        {
          data: [this.produtos.filter(v => v.status == 0).length, this.produtos.filter(v => v.status == 1).length, this.produtos.filter(v => v.status == 2).length],
          type: 'bar'
        }
      ]
    };

    grafico.setOption(configuracoes);
  }

  public geraGraficoProdutosCategorias(): void{

    let categoriaXproduto = []

    for(let i = 0; i < this.categorias.length; i++){
      categoriaXproduto.push({value: this.produtos.filter(v => v.categoriaId == this.categorias[i].id).length, name: this.categorias[i].descricao})
    }

    var elementoHTML = document.getElementById('categoriaXprodutos');
    var grafico = echarts.init(elementoHTML);
    var configuracoes = {
      title: {
        text: 'Produtos por categoria',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '70%',
          data: [...categoriaXproduto],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    grafico.setOption(configuracoes);
    
    
  }

}
