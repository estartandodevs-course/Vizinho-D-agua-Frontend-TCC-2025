import BarraTopo from "../../components/BarraTopo/BarraTopo";
import Busca from "../../components/Busca/Busca";
import { Link } from "react-router-dom";
import "./Contato.css"
export default function Contato() {
    return(
        <>
            <BarraTopo 
            title="Contatos"
            iconType="menu"/>

            <Busca placeholder="Buscar por CEP"/>

            <section className="lista-contatos-container">
                <article className="card-info-contato">
                    <h2>CEDAE</h2>
                    <p className="contato-estado">RJ</p>
                    <div className="contato-linha">
                        <Link to="tel:08002821195">0800 282 1195 </Link>
                        <span>- SAC</span>
                    </div>
                    <div className="contato-linha">
                        <Link to="tel:08002823059">0800 282 3059 </Link>
                        <span>- Ouvidoria</span>
                    </div>
                    <div className="contato-linha">
                        <Link to="tel:08002823060">
                        0800 282 3060
                        </Link>
                        <span className="contato-hifen">-</span>
                        <span className="contato-descricao-linha">
                        Central de Atendimento Acessivel (CAA)
                        </span>
                    
                    </div>
        
                    <Link to="mailto:ouvidoriageral@cedae.com.br">ouvidoriageral@cedae.com.br</Link>
                </article>
                <hr/>
                
                <article className="card-info-contato">
                    <h2>COSANPA</h2>
                    <p className="contato-estado">PA</p>
                    
                    <div className="contato-linha">
                        <Link to="tel:08000195195">0800 0195 195</Link>
                        <span>- Call Center</span>
                    </div>
                    <div className="contato-linha">
                        <Link to="tel:9131227194">(91) 31227194</Link>
                        <span>- WhatsApp</span>
                    </div>
                    <Link to="mailto:atendimentoaocliente@cosanpa.pa.gov.br">atendimentoaocliente@cosanpa.pa.gov.br</Link>
                </article>
                <hr/>
                


            </section>
        </>
    )
}