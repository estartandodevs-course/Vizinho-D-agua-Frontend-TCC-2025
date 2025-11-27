import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockComunidades, type Comunidade as ComunidadeMockType } from "../../mocks/comunidades.mock"; 
import {mockPostagens, type CommunityPost} from "../../mocks/postagens.mock";
import { useEffect } from "react";
import { IconVolta2 } from "../../assets/icons";
import CardPostagem from "../../components/CardPostagem/CardPostagem";
import "./ComunidadeDetalhes.css";
import Botao from "../../components/Botao/Botao";
import ModalCriarPostagem from "../../components/ModalCriarPostagem/ModalCriarPostagem";
import Carregando from "../../components/Carregando/Carregando";

import { getComunidades, saveComunidades, type Comunidade } from "../../utils/localStorage"; 
import { getPostagens } from "../../utils/localStoragePostagens";

type ComunidadeLocal = {
    id: number;
    title: string;
    description: string;
    coverImage: string | null; 
    members: number; 
    isSeguindo: boolean;
    isOwner: boolean;
};

type ComunidadeUnificada = ComunidadeMockType; 


type CommunityPostRaw = {
    id: string;
    communityId: string; 
    content: string; 
    authorName?: string; 
    authorImage?: string; 
    author?: any; 
    createdAt: string;
};


export default function ComunidadeDetalhes() {
    const {id} = useParams();
    const voltar = useNavigate();

    const [comunidade, setComunidade] = useState<ComunidadeUnificada | null>(null);
    const [postagens, setPostagens] = useState<CommunityPost[]>([]); 

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modalAberto, setModalAberto] = useState(false);
    
    const [recarregarPosts, setRecarregarPosts] = useState(0); 
    
    const carregarPostagens = (communityId: string): CommunityPost[] => {
        const postagensLocaisRaw = getPostagens() as CommunityPostRaw[]; 
        const postsLocaisFiltrados = postagensLocaisRaw.filter(p => p.communityId === communityId);
        
        const postsLocaisMapeados: CommunityPost[] = postsLocaisFiltrados.map(localPost => {
            
            const authorData = localPost.author || {
                id: localPost.id, 
                name: localPost.authorName || 'Desconhecido',
                profileImage: localPost.authorImage || ''
            };

            return ({
                id: localPost.id,
                communityId: localPost.communityId,
                content: localPost.content,
                createdAt: localPost.createdAt,
                author: authorData
            }) as CommunityPost;
        });
        
        const mockPostsNaoLocais = mockPostagens.filter(
            (mockPost) => 
                !postsLocaisMapeados.some(localPost => localPost.id === mockPost.id) && 
                mockPost.communityId === communityId
        );

        return [...postsLocaisMapeados, ...mockPostsNaoLocais];
    };


    const handleSeguir = (novoEstado: boolean) => {
        if (!comunidade) return;
        
        const novoContadorMembros = comunidade.members + (novoEstado ? 1 : -1);

        setComunidade({
            ...comunidade, 
            isSeguindo: novoEstado,
            members: novoContadorMembros
        });

        const todasComunidadesRaw = getComunidades();
        
        const idNumerico = Number(id);
        const indice = todasComunidadesRaw.findIndex(c => c.id === idNumerico);
        
        if (indice !== -1) {
            todasComunidadesRaw[indice].isSeguindo = novoEstado;
            todasComunidadesRaw[indice].members = novoContadorMembros; 
            saveComunidades(todasComunidadesRaw);
        } else {
            if(novoEstado) {
                const comunidadeParaSalvar: Comunidade = {
                    id: idNumerico, 
                    title: comunidade.title,
                    description: comunidade.description,
                    members: novoContadorMembros,
                    isSeguindo: novoEstado,
                    isOwner: comunidade.isOwner,
                    coverImage: comunidade.coverImage || null 
                } as Comunidade;

                todasComunidadesRaw.push(comunidadeParaSalvar);
                saveComunidades(todasComunidadesRaw);
            }
        }
    };


    useEffect(() => {
        async function carregarDados() {
            setLoading(true);
            setError("");

            try{
                await new Promise((resolve) => setTimeout (resolve, 300));
                
                const todasComunidadesLocais = getComunidades() as ComunidadeLocal[];
                const idNumerico = Number(id);
                
                const comunidadeLocal = todasComunidadesLocais.find((c) => c.id === idNumerico);
                
                let comunidadeCarregada: ComunidadeUnificada | null = null;
                
                if (comunidadeLocal) {
                    comunidadeCarregada = {
                        ...comunidadeLocal,
                        id: String(comunidadeLocal.id), 
                        coverImage: comunidadeLocal.coverImage || '' 
                    } as ComunidadeUnificada; 

                } else {
                    const comunidadeMock = mockComunidades.find((c) => c.id === id);
                    
                    if (comunidadeMock) {
                        comunidadeCarregada = comunidadeMock;
                    }
                }

                const postagensCarregadas = carregarPostagens(id!);

                if(!comunidadeCarregada){
                    setError("Comunidade não encontrada.");
                }
                
                setComunidade(comunidadeCarregada);
                setPostagens (postagensCarregadas);
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
    }, [id, recarregarPosts]); 

    if(error) return <p>{error}</p>;

    if(loading) return <Carregando />;

    if(!comunidade) return <p>Comunidade não encontrada.</p>;

    const coverImageSrc = comunidade?.coverImage || undefined;

    return(
        <div className="comunidade-detalhe-container">
            <header className="detalhe-banner-header">
                <img src={coverImageSrc}
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
                    <button onClick={() => handleSeguir(false)} className="detalhe-botao-acao">Deixar de seguir</button>
                ): (
                    <button onClick={() => handleSeguir(true)} className="detalhe-botao-acao">
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
                communityId={comunidade.id} 
                onClose={() => setModalAberto(false)}
                onPostCreated={() => {
                    setRecarregarPosts(prev => prev + 1);
                }} 
                />
                )}
        </div>
    )
}