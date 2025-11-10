import './CardComunidade.css';
import { Link } from 'react-router-dom';
type CardComunidadeProps = { 
    title: string;
    description: string;
    image: string;
    membros: number;
}
export default function CardComunidade({ title, description, image, membros }: CardComunidadeProps) {
    
    return(
        <div className="card-comunidade-container">

            <div className='card-comunidade-corpo'>
                <img src={image} alt={`Capa da comunidade ${title}`} className='card-comunidade-imagem' />
                <div className='card-comunidade-textos'>
                    <h3 className='card-comunidade-titulo'>{title}</h3>
                    <p className='card-comunidade-descricao'>{description}</p>
                </div>
            </div>

            <div className='card-comunidade-footer'>
                <span className='card-comunidade-membros'>{membros} membros</span>
                <Link to="#" className='card-comunidade-link'>Ver comunidade</Link>
            </div>
        </div>
    );
}
