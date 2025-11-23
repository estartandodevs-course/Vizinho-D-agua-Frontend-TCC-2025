import BarraTopo from "../../components/BarraTopo/BarraTopo";
import { mockDenuncias, type Denuncia } from "../../mocks/denuncias.mock";
import CardDenuncia from "../../components/CardDenuncia/CardDenuncia";
import BotaoAdiciona from "../../components/BotaoAdiciona/BotaoAdiciona";
import ModalDetalhesDenuncia from "../../components/ModalDetalhes/ModalDetalhes";
import { useState } from "react";
import Carregando from "../../components/Carregando/Carregando";
import { useEffect } from "react";
export default function Denuncias() {
    const [denuncia, setDenuncia] = useState<Denuncia[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [denunciaSelecionada, setDenunciaSelecionada] =  useState<Denuncia | null>(null);
   
    useEffect(() => {
        async function carregarDenuncias() 
        {
            setLoading(true);
        setError("");

        try{
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setDenuncia(mockDenuncias);
        } catch (err) {
            console.error(err);
            setError("Erro ao carregar as denúncias. Por favor, tente novamente.");
        } finally {
            setLoading(false);
        }
        }

        carregarDenuncias();
    }, [])
   
   
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
