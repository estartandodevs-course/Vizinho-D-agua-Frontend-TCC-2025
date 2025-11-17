import Botao from "../../components/Botao/Botao";
import { useNavigate } from "react-router-dom";
import "./SucessoComunidade.css";
export default function SucessoComunidade() {
    const voltar = useNavigate();

    const handlerContinuar = () =>{
        voltar("/minhas-comunidades");
    }
    return(
        <section className="sucesso-container">
            <div className="sucesso-conteudo">
                <h1 className="sucesso-titulo">Comunidade criada!</h1>
                <img src="/circulo-check.png" 
                alt="imagem de sucesso"
                className="sucesso-imagem"/>

                <Botao variante="sucesso" onClick={handlerContinuar}>
                    Continuar
                </Botao>
            </div>

            <footer className="sucesso-footer-onda">
                <img src="onda.png" alt="Onda decorativa" className="sucesso-imagem-onda"/>
                <img src="/logo.png" alt="Logo" className="sucesso-logo" />
            </footer>
        </section>
    )
}