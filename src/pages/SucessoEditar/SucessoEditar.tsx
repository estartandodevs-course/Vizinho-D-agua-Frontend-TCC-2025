import { useNavigate } from "react-router-dom"
import Botao from "../../components/Botao/Botao";
import './SucessoEditar.css';
export default function SucessoEditar(){
    const voltar = useNavigate();

    const handlerContinuar = () =>{
        voltar('/denuncias');
    }
    
    return(
        <section className="editar-container">
            <div className="editar-conteudo">
                <h1 className="editar-titulo">Alterações realizadas!</h1>
                <img src="/gota-check.png" alt="imagem de sucesso" className="editar-imagem"></img>

                <Botao onClick={handlerContinuar} variante="sucesso">
                    Continuar
                </Botao>
            </div>

            <footer className="editar-footer-onda">
                <img src="/onda.png" alt="onda decorativa" className="editar-imagem-onda"></img>
                <img src="/logo.png" alt="logo" className="editar-logo"></img>
            </footer>
            
        </section>

    )
}