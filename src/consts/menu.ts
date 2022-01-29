import { routes } from "./routes"

const menu = [
    {
      icone: "home",
      nome: "Principal",
      link: routes.PRINCIPAL
    },
    {
      icone: "create",
      nome: "Cadastros",
      submenu: [
        {
          nome: "Usuários",
          link: routes.TABELA_USUARIO,
          roles: ['Administrador']
        },
        {
          nome: "Clientes",
          link: routes.TABELA_CLIENTE,
          roles: ['Administrador']
        }
      ]
    },
    {
      icone: "laptop",
      nome: "Operações",
      submenu: [
        {
          nome: "Categorias",
          link: routes.TABELA_CATEGORIA,
          roles: ['Tributarista']
        },
        {
          nome: "Produtos",
          link: routes.TABELA_PRODUTO,
          roles: ['Tributarista', 'Cliente']
        }
      ]
    },
    {
      icone: "laptop",
      nome: "Relatórios",
      submenu: []
    },
    {
      icone: "lock_outline",
      nome: "Segurança",
      submenu: []
    }  
  ]  
export { menu }

