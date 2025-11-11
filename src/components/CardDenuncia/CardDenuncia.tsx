import { Link } from "react-router-dom";
import "./CardDenuncia.css";

type CardDenunciaProps = {
 title: string;
    location: string;
    date: string;
    status: 'Em Andamento' | 'Processada';
    linkType: 'Editar' | 'Ver Detalhes';
}
export default function CardDenuncia({ title, location, date, status, linkType }: CardDenunciaProps     ) {
        const getStatusInfo = () =>{
            if(status === 'Em Andamento'){
                return {text: 'Em Andamento', className: 'status-em-andamento'};
            }
            return {text: 'Processada', className: 'status-processada'};
        }
        const statusInfo = getStatusInfo();
        
    return (
        <article className="card-denuncia-container">
            <h3 className="card-denuncia-titulo">{title}</h3>
            <span className="card-denuncia-info">{location} • {date}</span>
            
            <footer className="card-denuncia-footer">
                <span className={`card-denuncia-status ${statusInfo.className}`}>
                    {statusInfo.text}  </span>
            
            {linkType === 'Editar' ? (
                <Link to="#" className="card-denuncia-link">Editar</Link>
            ) : (
                <Link to="#" className="card-denuncia-link">Ver Detalhes</Link>
            )
            }
            </footer>
        </article>
    )
}
