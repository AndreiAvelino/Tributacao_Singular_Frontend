import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FotoPerfilComponent } from './global/foto-perfil/foto-perfil.component';
import { FotoResolver } from './global/foto-perfil/foto-perfil.resolve';
import { PagesComponent } from './pages.component';
import { PrincipalComponent } from './principal/principal.component';
import { PrincipalResolve } from './principal/principal.resolve';

const routes: Routes = [
    {
      path: '',
      component: PagesComponent,
      children: [
        {
          path: 'principal',
          component: PrincipalComponent,
          resolve: { resolvePrincipal: PrincipalResolve }
        },
        {
          path: 'cadastro',
          loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroModule),
        },
        {
          path: 'operacoes',
          loadChildren: () => import('./operacoes/operacoes.module').then(m => m.OperacoesModule),
        },
        {
          path: 'foto-perfil',
          component: FotoPerfilComponent,
          resolve: { foto: FotoResolver }
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