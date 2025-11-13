import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Denuncias from "./pages/Denuncias/Denuncias";
import Comunidade from "./pages/Comunidade/Comunidade";
import Educacional from "./pages/Dicas/Dicas";
import "./App.css"
import MenuLateral from "./components/MenuLateral/MenuLateral";
import EscondeMenu from "./components/EscondeMenu/EscondeMenu";
import CriarDenuncia from "./pages/CriarDenuncia/CriarDenuncia";
import LayoutPrincipal from "./components/LayoutPrincipal/LayoutPrincipal";
import SucessoDenuncia from "./pages/SucessoDenuncia/SucessoDenuncia";
import EditarDenuncia from "./pages/EditarDenuncia/EditarDenuncia";

function App() {
  return (
    <>
      <MenuLateral />
      <EscondeMenu />
       <Routes>
        <Route path="/" element={<LayoutPrincipal />}>
          <Route index element={<Home />} />
          <Route path="/denuncias" element={<Denuncias />} />
          <Route path="/comunidade" element={<Comunidade />} />
          <Route path="/dicas" element={<Educacional />} />
          <Route path="/criar-denuncia" element={<CriarDenuncia />}></Route>
          <Route path="/editar-denuncia/:id" element={<EditarDenuncia />}></Route>
        </Route>


        <Route path="/sucesso-denuncia" element={<SucessoDenuncia />}></Route>
        {/* <Route path="/sucesso-editar" element={<SucessoEditar />}></Route> */}
      </Routes>

    </>
  );
}

export default App;
