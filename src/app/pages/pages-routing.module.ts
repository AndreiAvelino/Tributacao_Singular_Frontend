import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
    {
      path: '',
      component: PagesComponent,
      children: [
        {
          path: 'principal',
          component: PrincipalComponent
        },
        {
          path: 'cadastro',
          loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroModule),
        },
        {
          path: 'operacoes',
          loadChildren: () => import('./operacoes/operacoes.module').then(m => m.OperacoesModule),
        },
      ],
    }];
  
  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  
  export class PagesRoutingModule {
  }