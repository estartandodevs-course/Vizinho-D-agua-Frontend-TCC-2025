import BarraTopo from "../../components/BarraTopo/BarraTopo";
import Busca from "../../components/Busca/Busca";
import CardComunidade from "../../components/CardComunidade/CardComunidade";
import BotaoCriarComunidade from "../../components/BotaoCriarComunidade/BotaoCriarComunidade";
import { useEffect, useState } from "react";
import Carregando from "../../components/Carregando/Carregando";

import { mockComunidades } from "../../mocks/comunidades.mock";

export default function MinhasComunidades() {
    const [comunidades, setComunidades] = useState(mockComunidades);
    const [busca, setBusca] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setError("");

        try {
            setTimeout(() => {
                const minhas = mockComunidades.filter(c => c.isOwner === true);

                setComunidades(minhas);
                setLoading(false);
            }, 200);

        } catch (err) {
            console.error("Erro ao carregar comunidades:", err);

            setError("Erro ao carregar suas comunidades.");
            setLoading(false);
        }
    }, []);

    const comunidadesFiltradas = comunidades.filter(c =>
        c.title.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <>
            <BarraTopo title="Minhas Comunidades" iconType="menu" />

            <Busca
                placeholder="Buscar por uma comunidade"
                onSearch={(valor) => setBusca(valor)}
            />

            {loading && <Carregando />}

            {error && <p>{error}</p>}

            {!loading && !error && (
                <section className="lista-comunidades-container">
                    {comunidadesFiltradas.map((comunidade) => (
                        <CardComunidade
                            key={comunidade.id}
                            id={comunidade.id}
                            title={comunidade.title}
                            description={comunidade.description}
                            image={comunidade.coverImage}
                            members={comunidade.members}
                            isOwner={comunidade.isOwner}
                            isSeguindo={comunidade.isSeguindo}
                        />
                    ))}

                    {comunidadesFiltradas.length === 0 && (
                        <p>Você ainda não criou nenhuma comunidade.</p>
                    )}
                </section>
            )}

            <BotaoCriarComunidade />
        </>
    );
}
