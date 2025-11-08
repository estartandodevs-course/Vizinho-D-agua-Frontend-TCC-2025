import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Denuncias from "./pages/Denuncias/Denuncias";
import Comunidade from "./pages/Comunidade/Comunidade";
import Educacional from "./pages/Dicas/Dicas";
import "./App.css"
/*Fazer importações adicionais aqui, apenas para testes de components
quando for finalizado, remover os imports desnecessários*/

function App() {
  return (
    <>
      
      <main className="container-conteudo-pagina">
       
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/denuncias" element={<Denuncias />} />
        <Route path="/comunidade" element={<Comunidade />} />
        <Route path="/dicas" element={<Educacional />} />
      </Routes>
  
      </main>
      <NavBar />
    </>
  );
}

export default App;
