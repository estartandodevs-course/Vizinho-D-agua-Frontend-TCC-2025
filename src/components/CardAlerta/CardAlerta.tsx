import { useState } from "react";
import './CardAlerta.css'

import { IconAttentionColor, IconCheckColor } from "../../assets/icons";

type CardAlertaProps = {
    alertType: "Alerta em verificação" | "Alerta verificado";
    title: string;
    location: string;
    time: string;
    expandedText: string;
}

export default function CardAlerta({alertType, title, location, time, expandedText}: CardAlertaProps) {

    const [expandido, setExpandido] = useState(false);

    const getEstiloPorTipo = () =>{
        switch(alertType){
            case "Alerta em verificação":
                return{
                    classCor: 'tipo-verificacao',
                    icone: <IconAttentionColor />
                };
            case "Alerta verificado":
                return{
                    classCor: 'tipo-verificado',
                    icone: <IconCheckColor />
                };
        }
    }
    const {classCor, icone} = getEstiloPorTipo();
    return (
        <article className={`card-alerta-container ${classCor}`}>
        <div className="card-alerta-linha-superior">
            <div className="card-alerta-icone">
                {icone}
            </div>
            <div className="card-alerta-conteudo">
                <span className="card-alerta-titulo">{alertType}</span>
                <h3 className="card-alerta-subtitulo">{title}</h3>
                <span className="card-alerta-local">{location} • {time}</span>

                {expandido && (
                    <p className="card-alerta-expandido">{expandedText}</p>
                )}
            <button 
            className={`card-alerta-ver-detalhes ${expandido ? 'link-expandido' : ''}`}
                onClick={() => setExpandido(!expandido)}> 
                {expandido ? "Fechar" : "Ver detalhes"}
            </button>
            </div>        
        </div>
        </article>
    )
}