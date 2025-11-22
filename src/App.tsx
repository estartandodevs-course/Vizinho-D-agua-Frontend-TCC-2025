import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Denuncias from "./pages/Denuncias/Denuncias";
import Comunidade from "./pages/Comunidade/Comunidade";
import Educacional from "./pages/Dicas/Dicas";
import CriarDenuncia from "./pages/CriarDenuncia/CriarDenuncia";
import LayoutPrincipal from "./components/LayoutPrincipal/LayoutPrincipal";
import SucessoDenuncia from "./pages/SucessoDenuncia/SucessoDenuncia";
import EditarDenuncia from "./pages/EditarDenuncia/EditarDenuncia";
import SucessoEditar from "./pages/SucessoEditar/SucessoEditar";
import Contatos from "./pages/Contatos/Contato";
import ComunidadeDetalhes from "./pages/ComunidadeDetalhes/ComunidadeDetalhes";
import MinhasComunidades from "./pages/MinhasComunidades/MinhasComunidades";
import CriarComunidade from "./pages/CriarComunidade/CriarComunidade";
import SucessoComunidade from "./pages/SucessoComunidade/SucessoComunidade";
import EditarComunidade from "./pages/EditarComunidade/EditarComunidade";
import SucessoEditarComunidade from "./pages/SucessoEditarComunidade/SucessoEditarComunidade";
function App() {

  return (
    <>

       <Routes>
        <Route path="/" element={<LayoutPrincipal />}>
          <Route index element={<Home />} />
          <Route path="/denuncias" element={<Denuncias />} />
          <Route path="/comunidade" element={<Comunidade />} />
          <Route path="/comunidade/:id" element={<ComunidadeDetalhes />} />
          <Route path="/minhas-comunidades" element={<MinhasComunidades />} />
          <Route path="/criar-comunidade" element={<CriarComunidade />} />
          <Route path="/editar-comunidade/:id" element={<EditarComunidade />} />
          <Route path="/dicas" element={<Educacional />} />
          <Route path="/criar-denuncia" element={<CriarDenuncia />}></Route>
          <Route path="/editar-denuncia/:id" element={<EditarDenuncia />}></Route>
          <Route path="/contatos" element={<Contatos />}></Route>
          
        </Route>


        <Route path="/sucesso-denuncia" element={<SucessoDenuncia />}></Route>
        <Route path="/sucesso-editar" element={<SucessoEditar />}></Route>
        <Route path="/sucesso-comunidade" element={<SucessoComunidade />}></Route>
        <Route path="/sucesso-editar-comunidade" element={<SucessoEditarComunidade />}></Route>
      </Routes>

    </>
  );
}

export default App;
