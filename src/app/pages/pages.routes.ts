import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClienteComponent } from './cadastro/cliente/cliente.component'; 
import { ClienteEditarComponent } from './cadastro/cliente/cliente-editar/cliente-editar.component';
import { UsuarioComponent } from './cadastro/seguranca/usuario/cadastro/usuario.component';
import { DepartamentoComponent } from './cadastro/departamento/departamento.component';

export const PagesRoutes: Routes = [
  {    path: '',    component: DashboardComponent  },

  {    path: 'cliente',    component: ClienteComponent  },
  {    path: 'cliente-adicionar',    component: ClienteComponent  },
  {    path: 'cliente-editar',    component: ClienteEditarComponent  },
  {    path: 'cliente-visualizar',   component: ClienteComponent  },
  {    path: 'cliente-excluir',    component: ClienteComponent },

  {    path: 'usuario',    component: UsuarioComponent  },
  {    path: 'departamento',    component: DepartamentoComponent  },
  {
    path: '**',    redirectTo: 'starter',
  },
];
