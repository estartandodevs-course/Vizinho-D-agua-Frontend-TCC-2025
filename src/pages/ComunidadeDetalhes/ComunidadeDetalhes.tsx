import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { mockComunidades, type Comunidade } from "../../mocks/comunidades.mock";
import { mockPostagens, type CommunityPost } from "../../mocks/postagens.mock";

import { IconVolta2 } from "../../assets/icons";
import CardPostagem from "../../components/CardPostagem/CardPostagem";
import Carregando from "../../components/Carregando/Carregando";
import Botao from "../../components/Botao/Botao";
import ModalCriarPostagem from "../../components/ModalCriarPostagem/ModalCriarPostagem";

import "./ComunidadeDetalhes.css";

export default function ComunidadeDetalhes() {
    const { id } = useParams<{ id: string }>();
    const voltar = useNavigate();

    const [comunidade, setComunidade] = useState<Comunidade | null>(null);
    const [postagens, setPostagens] = useState<CommunityPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        if (!id) {
            setError("ID não informado.");
            setLoading(false);
            return;
        }

        try {
            const encontrada = mockComunidades.find(c => c.id === id);

            if (!encontrada) {
                setError("Comunidade não encontrada.");
                setLoading(false);
                return;
            }

            setComunidade(encontrada);

            const posts = mockPostagens.filter(p => p.communityId === id);
            setPostagens(posts);

        } catch {
            setError("Erro ao carregar dados.");
        } finally {
            setLoading(false);
        }
    }, [id]);

    const handleSeguir = (seguir: boolean) => {
        if (!comunidade) return;

        setComunidade({
            ...comunidade,
            isSeguindo: seguir,
            members: comunidade.members + (seguir ? 1 : -1)
        });
    };

    if (loading) return <Carregando />;
    if (error) return <p>{error}</p>;
    if (!comunidade) return <p>Comunidade não encontrada.</p>;

    return (
        <div className="comunidade-detalhe-container">
         
            <header className="detalhe-banner-header">
                <img
                    src={comunidade.coverImage}
                    alt={comunidade.title}
                    className="detalhe-banner-img"
                />

                <button onClick={() => voltar(-1)} className="detalhe-banner-voltar">
                    <IconVolta2 />
                </button>
            </header>

       
            <section className="detalhe-info-container">
                <h1 className="detalhe-titulo">
                    {comunidade.title} ·{" "}
                    <span className="detalhe-membros">
                        {comunidade.members} membros
                    </span>
                </h1>

                <p className="detalhe-descricao">{comunidade.description}</p>

         
                {comunidade.isOwner && (
                    <button
                        onClick={() => voltar(`/editar-comunidade/${comunidade.id}`)}
                        className="detalhe-botao-acao"
                    >
                        Editar 
                    </button>
                )}

        
                {!comunidade.isOwner && (
                    comunidade.isSeguindo ? (
                        <button
                            onClick={() => handleSeguir(false)}
                            className="detalhe-botao-acao"
                        >
                            Deixar de seguir
                        </button>
                    ) : (
                        <button
                            onClick={() => handleSeguir(true)}
                            className="detalhe-botao-acao"
                        >
                            Seguir
                        </button>
                    )
                )}
            </section>


            <section className="detalhe-posts-lista">
                {postagens.length > 0 ? (
                    postagens.map(post => <CardPostagem key={post.id} post={post} />)
                ) : (
                    <p>Nenhuma postagem ainda.</p>
                )}
            </section>

       
            {comunidade.isSeguindo && (
                <div className="detalhe-fab-container">
                    <Botao variante="primario" onClick={() => setModalAberto(true)}>
                        + Nova Postagem
                    </Botao>
                </div>
            )}

            {modalAberto && (
                <ModalCriarPostagem
                    comunidadeNome={comunidade.title}

                    onClose={() => setModalAberto(false)}

                />
            )}
        </div>
    );
}
