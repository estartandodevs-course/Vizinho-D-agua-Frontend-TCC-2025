import { IconArrowDown, IconPlay } from '../../assets/icons';
import './CardDicas.css'

type CardDicasProps = {
    image: string;
    title: string;
    author: string;
    contentType: "Video" | "Documento";   
    fileUrl?: string;
}

export default function CardDicas({ image, title, author, contentType, fileUrl }: CardDicasProps) {
    const infoAutor = `${author} • ${contentType === "Video" ? "Vídeo" : "Documento"}`;
    
    return (
        <article className="card-dicas-container">
        <div className="card-dicas-imagem">
            <img src={image}
             alt={title}
             className='card-dicas-midia'>
           </img>
           {contentType === 'Video' &&  (
                <div className="card-dicas-play-overlay">
                    <IconPlay />
                </div>
            )}
        </div>
            <footer className="card-dicas-conteudo">
                <div className="card-dicas-textos">
                    <h3 className="card-dicas-titulo">{title}</h3>
                    <p className="card-dicas-autor">{infoAutor}</p>
                </div>
                    {fileUrl ? (
                        <a href={fileUrl} 
                        download
                        className='card-dicas-download-icone'>
                            <IconArrowDown />
                        </a>
                        ) : (
                            <span className='card-dicas-download-icone disabled' >
                                <IconArrowDown />
                            </span>
                        )
                    }
                    
            </footer>

        </article>
    )
}
