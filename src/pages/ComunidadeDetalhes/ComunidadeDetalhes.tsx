import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockComunidades, type Comunidade } from "../../mocks/comunidades.mock";
import {mockPostagens, type CommunityPost} from "../../mocks/postagens.mock";
import { useEffect } from "react";
import { IconVolta2 } from "../../assets/icons";
import CardPostagem from "../../components/CardPostagem/CardPostagem";
import "./ComunidadeDetalhes.css";
import Botao from "../../components/Botao/Botao";
import ModalCriarPostagem from "../../components/ModalCriarPostagem/ModalCriarPostagem";
export default function ComunidadeDetalhes() {
    const {id} = useParams();
    const voltar = useNavigate();
    const navegar = useNavigate();

    const [comunidade, setComunidade] = useState<Comunidade | null>(null);
    const [postagens, setPostagens] = useState<CommunityPost[]>([]);
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        const info = mockComunidades.find(comunidade => comunidade.id === id);
        if(info)
        {
            setComunidade(info);
        }
        const postsDaComunidade = mockPostagens.filter(post => post.communityId === id);
        setPostagens(postsDaComunidade);
    }, [id]);

    if(!comunidade){
        return <div>Carregando...</div>;
    }

    return(
        <div className="comunidade-detalhe-container">
            <header className="detalhe-banner-header">
                <img src={comunidade?.coverImage}
                alt={comunidade?.title}
                className="detalhe-banner-img"/>

                <button onClick={() => voltar(-1)}
                    className="detalhe-banner-voltar">
                    <IconVolta2 />
                </button>
            </header>

            <section className="detalhe-info-container">
                <div className="detalhe-cabecalho-info">
                    <h1 className="detalhe-titulo">{comunidade?.title} · <span className="detalhe-membros"> {comunidade?.members} membros</span></h1>
                   
                </div>
                <p className="detalhe-descricao">{comunidade?.description}</p>
                
                {comunidade.isOwner ?(
                    <button onClick={() => navegar(`/editar-comunidade/${comunidade.id}`)}
                    className="detalhe-botao-acao">
                    Editar
                    </button>
                ): comunidade?.isSeguindo ?(
                    <button onClick={() => {}} className="detalhe-botao-acao">Deixar de seguir</button>
                ): (
                    <button onClick={() => {}} className="detalhe-botao-acao">
                    Seguir
                    </button>
                )}
            </section>
          
            
            <section className="detalhe-posts-lista">
                {postagens.map(post =>(
                    <CardPostagem key={post.id} post={post} />
                ))}
            </section>

            {comunidade?.isSeguindo && (
                <div className="detalhe-fab-container">
                    <Botao onClick={() => setModalAberto(true)} variante="primario">+ Nova Postagem</Botao>
                </div>
            )}
            {modalAberto && (
                <ModalCriarPostagem
                comunidadeNome={comunidade.title}
                onClose={() => setModalAberto(false)}
                />
                )}
        </div>
    )
}