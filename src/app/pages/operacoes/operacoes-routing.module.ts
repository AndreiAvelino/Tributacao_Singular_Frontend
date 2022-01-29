import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { TabelaCategoriaComponent } from './tabela-categoria/tabela-categoria.component';
import { TabelaCategoriaResolve } from './tabela-categoria/tabela-categoria.resolve';
import { CrudCategoriaComponent } from './crud-categoria/crud-categoria.component';
import { CrudProdutoComponent } from './crud-produto/crud-produto.component';
import { OperacoesComponent } from './operacoes.component';
import { TabelaProdutoComponent } from './tabela-produto/tabela-produto.component';
import { TabelaProdutoResolve } from './tabela-produto/tabela-produto.resolve';
import { AdicionarArquivoProdutoComponent } from './adicionar-arquivo-produto/adicionar-arquivo-produto.component';

const routes: Routes = [
  {  
    path: '',
    component: OperacoesComponent,
    children: [
      {
        path: 'tabela-categoria',
        component: TabelaCategoriaComponent,
        resolve: { resolveCategorias: TabelaCategoriaResolve }
      },
      {
        path: 'crud-categoria',
        component: CrudCategoriaComponent
      },
      {
        path: 'tabela-produto',
        component: TabelaProdutoComponent,
        resolve: { resolveProdutos: TabelaProdutoResolve }
      },
      {
        path: 'crud-produto',
        component: CrudProdutoComponent
      },
      {
        path: 'adicionar-lista-produto',
        component: AdicionarArquivoProdutoComponent
      }
    ]
  },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class OperacoesRoutingModule {
}
export const routedComponents = [
  TabelaCategoriaComponent,
  TabelaProdutoComponent
] 