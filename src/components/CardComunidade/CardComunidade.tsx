import './CardComunidade.css';
import { Link } from 'react-router-dom';
type CardComunidadeProps = { 
    id: string;
    title: string;
    description: string;
    image: string;
    members: number;
    isOwner?: boolean;
    isSeguindo?: boolean;
}
export default function CardComunidade({ id, title, description, image, members  }: CardComunidadeProps) {
    
    return(
        <article className="card-comunidade-container">

            <div className='card-comunidade-corpo'>
                <img src={image} alt={`Capa da comunidade ${title}`} className='card-comunidade-imagem' />
                <div className='card-comunidade-textos'>
                    <h3 className='card-comunidade-titulo'>{title}</h3>
                    <p className='card-comunidade-descricao'>{description}</p>
                </div>
            </div>

            <footer className='card-comunidade-footer'>
                <span className='card-comunidade-membros'>{members} membros</span>
                <Link to={`/comunidade/${id}`} className='card-comunidade-link'>Ver comunidade</Link>
            </footer>
        </article>
    );
}
