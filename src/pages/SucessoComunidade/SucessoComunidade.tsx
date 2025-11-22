import Botao from "../../components/Botao/Botao";
import { useNavigate } from "react-router-dom";
import "./SucessoComunidade.css";
export default function SucessoComunidade() {
    const voltar = useNavigate();

    const handlerContinuar = () =>{
        voltar("/minhas-comunidades");
    }
    return(
        <section className="sucesso-comunidade-container">
            <div className="sucesso-comunidade-conteudo">
                <h1 className="sucesso-comunidade-titulo">Comunidade criada!</h1>
                <img src="/circulo-check.png" 
                alt="imagem de sucesso"
                className="sucesso-comunidade-imagem"/>

                <Botao variante="sucesso" onClick={handlerContinuar}>
                    Continuar
                </Botao>
            </div>

            <footer className="sucesso-comunidade-footer-onda">
                <img src="onda.png" alt="Onda decorativa" className="sucesso-comunidade-imagem-onda"/>
                <img src="/logo.png" alt="Logo" className="sucesso-comunidade-logo" />
            </footer>
        </section>
    )
}