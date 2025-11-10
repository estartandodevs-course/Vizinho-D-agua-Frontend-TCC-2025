import { useState } from "react";
import './CardAlerta.css'

import { IconAttentionColor, IconCheckColor } from "../../assets/icons";
import { Link } from "react-router-dom";

type CardAlertaProps = {
    alertType: "Alerta em verificação" | "Alerta verificado";
    title: string;
    location: string;
    time: string;
    expandedText: string;
}

export default function CardAlerta({alertType, title, location, time, expandedText}: CardAlertaProps) {

    const [estaExpandido, setEstaExpandido] = useState(false);

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
            default:
                return{
                    classCor: 'tipo-verificacao',
                    icone: <IconAttentionColor />
                };
        }
    }
    const {classCor, icone} = getEstiloPorTipo();
    return (
        <div className={`card-alerta-container ${classCor}`}>
        <div className="card-alerta-linha-superior">
            <div className="card-alerta-icone">
                {icone}
            </div>
            <div className="card-alerta-conteudo">
                <span className="card-alerta-titulo">{alertType}</span>
                <h3 className="card-alerta-subtitulo">{title}</h3>
                <span className="card-alerta-local">{location} • {time}</span>

                {estaExpandido && (
                    <p className="card-alerta-expandido">{expandedText}</p>
                )}
            <Link to="#" 
            className={`card-alerta-ver-detalhes ${estaExpandido ? 'link-expandido' : ''}`}
                onClick={() => setEstaExpandido(!estaExpandido)}>
                {estaExpandido ? "Fechar" : "Ver detalhes"}
            </Link>
            </div>        
        </div>
        </div>
    )
}