import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CrudClienteComponent } from './crud-cliente/crud-cliente.component';

import { CadastroComponent } from './cadastro.component';
import { TabelaClienteComponent } from './tabela-cliente/tabela-cliente.component';
import { TabelaClienteResolve } from './tabela-cliente/tabela-cliente.resolve';
import { UsuarioComponent } from './usuario/usuario.component';
import { TabelaUsuarioComponent } from './tabela-usuario/tabela-usuario.component';
import { TabelaUsuarioResolve } from './tabela-usuario/tabela-usuario.resolve';

const routes: Routes = [
  {  
    path: '',
    component: CadastroComponent,
    children: [
      {
        path: 'usuario',
        component: UsuarioComponent,
      },
      {
        path: 'crud-cliente',
        component: CrudClienteComponent,
        resolve: { resolveTabelaCliente: TabelaClienteResolve }
      },
      {
        path: 'tabela-cliente',
        component: TabelaClienteComponent,
        resolve: { resolveTabelaCliente: TabelaClienteResolve }
      },
      {
        path: 'tabela-usuario',
        component: TabelaUsuarioComponent,
        resolve: { resolveTabelaUsuario: TabelaUsuarioResolve }
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

export class CadastroRoutingModule {
}
export const routedComponents = [
    UsuarioComponent
] 