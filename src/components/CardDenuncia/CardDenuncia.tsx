import { Link } from "react-router-dom";
import "./CardDenuncia.css";

type CardDenunciaProps = {
    id: string;
    title: string;
    location: string;
    date: string;
    status: 'Em Andamento' | 'Processada';
    linkType: 'Editar' | 'Ver Detalhes';
    onVerDetalhesClick?: () => void;
}
export default function CardDenuncia({ id, title, location, date, status, linkType, onVerDetalhesClick }: CardDenunciaProps     ) {
        const getStatusInfo = () =>{
            const statusInfo = status === 'Em Andamento'
                ? { text: 'Em Andamento', className: 'status-em-andamento' }
                : { text: 'Processada', className: 'status-processada' };
            return statusInfo;
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
                <Link to={`/editar-denuncia/${id}`} className="card-denuncia-link">
                    Editar
                </Link>
            ):(
                <button onClick={onVerDetalhesClick} className="card-denuncia-link as-button">
                    Ver Detalhes
                </button>
            )}
            </footer>
        </article>
    )
}
