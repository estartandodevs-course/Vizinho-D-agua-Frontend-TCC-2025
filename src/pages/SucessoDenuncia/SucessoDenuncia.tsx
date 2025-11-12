import { useNavigate } from "react-router-dom"
import Botao from "../../components/Botao/Botao";
import './SucessoDenuncia.css';
export default function SucessoDenuncia(){
    const voltar = useNavigate();

    const handlerContinuar = () =>{
        voltar('/denuncias');
    }
    
    return(
        <section className="sucesso-container">
            <div className="sucesso-conteudo">
                <h1 className="sucesso-titulo">Denúncia criada!</h1>
                <img src="/gota-check.png" alt="imagem de sucesso" className="sucesso-imagem"></img>

                <Botao onClick={handlerContinuar} variante="sucesso">
                    Continuar
                </Botao>
            </div>

            <footer className="sucesso-footer-onda">
                <img src="/onda.png" alt="onda decorativa" className="sucesso-imagem-onda"></img>
                <img src="/logo.png" alt="logo" className="sucesso-logo"></img>
            </footer>
            
        </section>

    )
}