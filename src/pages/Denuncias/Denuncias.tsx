import BarraTopo from "../../components/BarraTopo/BarraTopo";
import { mockDenuncias, type Denuncia } from "../../mocks/denuncias.mock";
import CardDenuncia from "../../components/CardDenuncia/CardDenuncia";
import BotaoAdiciona from "../../components/BotaoAdiciona/BotaoAdiciona";
import ModalDetalhesDenuncia from "../../components/ModalDetalhes/ModalDetalhes";
import { useState } from "react";
export default function Denuncias() {
    const [denunciaSelecionada, setDenunciaSelecionada] =  useState<Denuncia | null>(null);
    return (
        <>
            <BarraTopo 
            title="Denúncias"
            iconType="menu"/>
        <section className="lista-denuncias-container">
            {mockDenuncias.map(denuncia => (
                <CardDenuncia 
                key={denuncia.id}
                id={denuncia.id}
                title={denuncia.reportType}
                location={denuncia.location}
                date={denuncia.date}
                status={denuncia.status}
                linkType={denuncia.linkType}
                onVerDetalhesClick={() => setDenunciaSelecionada(denuncia)}
                />
            ))}
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
