import Botao from "../../components/Botao/Botao";
import { useNavigate } from "react-router-dom";
import "./SucessoEditarComunidade.css";
    export default function SucessoEditarComunidade() {
    const voltar = useNavigate();

    const handlerContinuar = () =>{
        voltar("/minhas-comunidades");
    }
    return(
        <section className="editar-comunidade-container">
            <div className="editar-comunidade-conteudo">
                <h1 className="editar-comunidade-titulo">Alterações realizadas!</h1>
                <img src="/circulo-check.png" 
                alt="imagem de sucesso"
                className="editar-comunidade-imagem"/>

                <Botao variante="sucesso" onClick={handlerContinuar}>
                    Continuar
                </Botao>
            </div>

            <footer className="editar-comunidade-footer-onda">
                <img src="onda.png" alt="Onda decorativa" className="editar-comunidade-imagem-onda"/>
                <img src="/logo.png" alt="Logo" className="editar-comunidade-logo" />
            </footer>
        </section>
    )
}