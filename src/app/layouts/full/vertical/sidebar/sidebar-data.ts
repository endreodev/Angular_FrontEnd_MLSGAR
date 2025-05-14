import { NavItem } from './nav-item/nav-item';
export const navItems: NavItem[] = [
  {
    navCap: 'Sistema',
  },
  {
    displayName: 'Cadastros',
    iconName: 'box-multiple',
    route: '/cadastros',
    children: [
      {
        displayName: 'Departamento',
        iconName: 'building',
        route: 'dashboard/departamento',
      },
      {
        displayName: 'Documentos',
        iconName: 'file',
        route: 'dashboard/documentos',
      },
      {
        displayName: 'Segurança',
        iconName: 'lock',
        route: '',
        children: [
          {
            displayName: 'Controle de Acesso',
            iconName: 'point',
            route: 'dashboard/controle-acesso',
          },
          {
            displayName: 'Usuários',
            iconName: 'user',
            route: '',
            children: [
              {
                displayName: 'Cadastro',
                iconName: 'point',
                route: '/dashboard/usuario',
              },
              {
                displayName: 'Perfil',
                iconName: 'point',
                route: '/dashboard/perfil',
              },
              {
                displayName: 'Perfis - Vínculos',
                iconName: 'point',
                route: '/dashboard/perfil-vinculado',
              },
              {
                displayName: 'Senhas',
                iconName: 'point',
                route: '/dashboard/senhas',
              },
              {
                displayName: 'Situação',
                iconName: 'point',
                route: '/dashboard/situacao',
              },
            ],
          }
        ],
      },
    ]
  },
  {
    navCap: 'Empresa',
  },
  {
    displayName: 'Cadastros',
    iconName: 'box-multiple',
    route: '',
    children: [
      {
        displayName: 'Cliente',
        iconName: 'user',   
        route: '/dashboard/cliente',
      }
    ]
  }
];