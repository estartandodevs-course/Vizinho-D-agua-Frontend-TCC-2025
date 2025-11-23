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
import Carregando from "../../components/Carregando/Carregando";

export default function ComunidadeDetalhes() {
    const {id} = useParams();
    const voltar = useNavigate();


    const [comunidade, setComunidade] = useState<Comunidade | null>(null);
    const [postagens, setPostagens] = useState<CommunityPost[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        async function carregarDados() {
            try{
                await new Promise((resolve) => setTimeout (resolve, 300));

                const c = mockComunidades.find((comunidade) => comunidade.id === id) ?? null;
                const p = mockPostagens.filter((postagem) => postagem.communityId === id);

                if(!c){
                    setError("Comunidade não encontrada.");
                }
                setComunidade(c);
                setPostagens (p);
            }
            catch(error) {
                console.error(error);
                setError("Erro ao carregar dados da comunidade.");
            }
            finally {
                setLoading(false);
            }
        }
        carregarDados();
    }, [id]);

    if(error) return <p>{error}</p>;

    if(loading) return <Carregando />;

    if(!comunidade) return <p>Comunidade não encontrada.</p>;

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
                    <button onClick={() => voltar(`/editar-comunidade/${comunidade.id}`)}
                    className="detalhe-botao-acao">
                    Editar
                    </button>
                ): comunidade?.isSeguindo ?(
                    <button onClick={() =>setComunidade({...comunidade, isSeguindo: false})} className="detalhe-botao-acao">Deixar de seguir</button>
                ): (
                    <button onClick={() => setComunidade({...comunidade, isSeguindo: true})} className="detalhe-botao-acao">
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