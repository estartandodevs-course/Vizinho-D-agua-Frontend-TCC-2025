import {Home, Denuncias, Comunidade, ComunidadeDetalhes, CriarComunidade, 
  EditarComunidade, MinhasComunidades, Dicas, 
  LayoutPrincipal, CriarDenuncia, EditarDenuncia, Contatos,
  SucessoDenuncia, SucessoEditar, SucessoComunidade, SucessoEditarComunidade,} from "../pages";


export const routes = [
  {
    path: "/",
    element: <LayoutPrincipal />,
    children: [
      { index: true, element: <Home /> },
      { path: "denuncias", element: <Denuncias /> },
      { path: "comunidade", element: <Comunidade /> },
      { path: "comunidade/:id", element: <ComunidadeDetalhes /> },
      { path: "minhas-comunidades", element: <MinhasComunidades /> },
      { path: "criar-comunidade", element: <CriarComunidade /> },
      { path: "editar-comunidade/:id", element: <EditarComunidade /> },
      { path: "dicas", element: <Dicas /> },
      { path: "criar-denuncia", element: <CriarDenuncia /> },
      { path: "editar-denuncia/:id", element: <EditarDenuncia /> },
      { path: "contatos", element: <Contatos /> },
    ]
  },

  { path: "/sucesso-denuncia", element: <SucessoDenuncia /> },
  { path: "/sucesso-editar", element: <SucessoEditar /> },
  { path: "/sucesso-comunidade", element: <SucessoComunidade /> },
  { path: "/sucesso-editar-comunidade", element: <SucessoEditarComunidade /> },
];
