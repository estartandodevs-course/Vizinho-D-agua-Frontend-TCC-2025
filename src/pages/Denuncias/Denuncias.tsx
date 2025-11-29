import BarraTopo from "../../components/BarraTopo/BarraTopo";
import {type Denuncia } from "../../mocks/denuncias.mock";
import CardDenuncia from "../../components/CardDenuncia/CardDenuncia";
import BotaoAdiciona from "../../components/BotaoAdiciona/BotaoAdiciona";
import ModalDetalhesDenuncia from "../../components/ModalDetalhes/ModalDetalhes";
import { useState } from "react";
import Carregando from "../../components/Carregando/Carregando";
import { useEffect } from "react";
import { listarDenunciasAPI } from "../../services/denuncias.services";
import "./Denuncias.css";
export default function Denuncias() {
    const [denuncia, setDenuncia] = useState<Denuncia[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [denunciaSelecionada, setDenunciaSelecionada] =  useState<Denuncia | null>(null);
   
      const carregarDenuncias = async () => {
        setLoading(true);
        setError("");

        try {
            
            const dadosDoBackend = await listarDenunciasAPI();
            
            if (Array.isArray(dadosDoBackend)) {
                setDenuncia(dadosDoBackend);
            } else {
               
                console.warn("API retornou dados inválidos, resetando lista.");
                setDenuncia([]);
            }
        } catch (err) {
            console.error(err);
            setError("Não foi possível carregar as denúncias. Verifique sua conexão.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarDenuncias();
    }, []);
   
   
    return (
        <>
            <BarraTopo 
            title="Denúncias"
            iconType="menu"/>
        <section className="lista-denuncias-container">

            {loading && <Carregando />}
            {error && <p>{error}</p>}

            {!loading && !error && denuncia.length === 0 && (
                <p>Nenhuma denúncia encontrada.</p>
            )}
            {!loading && !error && denuncia.length > 0 &&(
                denuncia.map((denuncias) => (
                    <CardDenuncia 
                    key={denuncias.id}
                    id={denuncias.id}
                    title={denuncias.reportType}
                    location={denuncias.location}
                    date={denuncias.createdAt}
                    status={denuncias.status}
                    linkType={denuncias.linkType}
                    onVerDetalhesClick={() => setDenunciaSelecionada(denuncias)}
                    />
                ))
            )}
            
        </section>
            <BotaoAdiciona />
            {denunciaSelecionada && (
                <ModalDetalhesDenuncia 
                denuncia={denunciaSelecionada}
                onClose={() => setDenunciaSelecionada(null)}
                />
            )}
        </>
    );
}
