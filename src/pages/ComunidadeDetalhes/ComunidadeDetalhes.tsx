import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconVolta2 } from "../../assets/icons";
import CardPostagem from "../../components/CardPostagem/CardPostagem";
import "./ComunidadeDetalhes.css";
import Botao from "../../components/Botao/Botao";
import ModalCriarPostagem from "../../components/ModalCriarPostagem/ModalCriarPostagem";
import Carregando from "../../components/Carregando/Carregando";

import { 
    obterComunidadePorId, 
    listarPostagensDaComunidade, 
    type ComunidadeAPI 
} from "../../services/comunidade.services";

export default function ComunidadeDetalhes() {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [comunidade, setComunidade] = useState<ComunidadeAPI | null>(null);
    const [postagens, setPostagens] = useState<any[]>([]);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        async function carregarDados() {
            if (!id) return;

            try {
                setLoading(true);
                const [dadosComunidade, dadosPosts] = await Promise.all([
                    obterComunidadePorId(id),
                    listarPostagensDaComunidade(id)
                ]);

                setComunidade(dadosComunidade);
                setPostagens(dadosPosts);
            } catch (error) {
              
                setError("Erro ao carregar dados da comunidade.");
            } finally {
                setLoading(false);
            }
        }
        carregarDados();
    }, [id]);

    if (error) return <p>{error}</p>;
    if (loading) return <Carregando />;
    if (!comunidade) return <p>Comunidade não encontrada.</p>;

    const imagemCapa = comunidade.coverImage && comunidade.coverImage !== "" 
        ? comunidade.coverImage 
        : "https://via.placeholder.com/800x200?text=Sem+Imagem"; 

    return (
        <div className="comunidade-detalhe-container">
            <header className="detalhe-banner-header">
                <img 
                    src={imagemCapa} 
                    alt={comunidade.title}
                    className="detalhe-banner-img" 
                />

                <button onClick={() => navigate(-1)} className="detalhe-banner-voltar">
                    <IconVolta2 />
                </button>
            </header>

            <section className="detalhe-info-container">
                <div className="detalhe-cabecalho-info">
                    <h1 className="detalhe-titulo">
                        {comunidade.title} · <span className="detalhe-membros"> {comunidade.membersCount} membros</span>
                    </h1>
                </div>
                
                <p className="detalhe-descricao">{comunidade.description}</p>
                
                {comunidade.isOwner ? (
                    <button 
                        onClick={() => navigate(`/editar-comunidade/${comunidade.id}`)}
                        className="detalhe-botao-acao"
                    >
                        Editar
                    </button>
                ) : comunidade.isSeguindo ? (
                    <button 
                        onClick={() => setComunidade({ ...comunidade, isSeguindo: false })} 
                        className="detalhe-botao-acao"
                    >
                        Deixar de seguir
                    </button>
                ) : (
                    <button 
                        onClick={() => setComunidade({ ...comunidade, isSeguindo: true })} 
                        className="detalhe-botao-acao"
                    >
                        Seguir
                    </button>
                )}
            </section>
            
            <section className="detalhe-posts-lista">
                {postagens.length > 0 ? (
                    postagens.map(post => (
                        <CardPostagem key={post.id} post={post} />
                    ))
                ) : (
                    <p style={{textAlign: "center", marginTop: 20, color: "#666"}}>
                        Nenhuma postagem ainda. Seja o primeiro a postar!
                    </p>
                )}
            </section>

            {comunidade.isSeguindo && (
                <div className="detalhe-fab-container">
                    <Botao onClick={() => setModalAberto(true)} variante="primario">
                        + Nova Postagem
                    </Botao>
                </div>
            )}

            {modalAberto && (
                <ModalCriarPostagem
                    comunidadeNome={comunidade.title}
                    comunidadeId={id!} 
                    onClose={() => setModalAberto(false)}
                />
            )}
        </div>
    );
}