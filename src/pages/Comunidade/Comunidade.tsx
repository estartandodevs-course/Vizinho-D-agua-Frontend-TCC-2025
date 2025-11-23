
import Abas from "../../components/abas/abas";
import BarraTopo from "../../components/BarraTopo/BarraTopo";
import Busca from "../../components/Busca/Busca";
import { useEffect, useState } from "react";
import { mockComunidades, type Comunidade } from "../../mocks/comunidades.mock";
import CardComunidade from "../../components/CardComunidade/CardComunidade";
import Carregando from "../../components/Carregando/Carregando";

export default function Comunidade() {
    const abasDaPagina = ["Explorar", "Seguindo"];
    const[abaAtiva, setAbaAtiva] = useState(abasDaPagina[0]);
    const [busca, setBusca] = useState("");

    const [comunidade, setComunidade] = useState<Comunidade[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setError] = useState("");

    useEffect(() => {
        async function carregarComunidade() {
            try{
                await new Promise((resolve) => setTimeout(resolve, 300));
            }catch(error) {
                console.error("Erro ao carregar comunidades:", error);
            }
            finally{
                setLoading(false);
            }
        }
        carregarComunidade();
    }, []);

    function filtrarComunidade(lista: Comunidade[], aba: string) {
        const filtroBusca = (c: Comunidade) =>
            c.title.toLowerCase().includes(busca.toLowerCase());
        if (aba === "Explorar") return lista.filter(c => !c.isSeguindo && filtroBusca(c));
        if (aba === "Seguindo") return lista.filter(c => c.isSeguindo && filtroBusca(c));
        return lista.filter(filtroBusca);
    }
    const comunidadeFiltrada = filtrarComunidade(mockComunidades, abaAtiva);


    function handleTrocarAba(novaAba: string) {
        setAbaAtiva(novaAba);
        setBusca("");
    }

    return (
        <>
            <BarraTopo
            title="Comunidades"
            iconType="menu" />
            <Busca placeholder="Buscar por uma comunidade" onSearch={(valor) => setBusca(valor)} />

            <nav>
            <Abas listaDeAbas={abasDaPagina}
            abaAtiva={abaAtiva}
            onAbaClick={handleTrocarAba} />
            </nav>

            {loading && <Carregando />}

            {erro && <p>{erro}</p>}

            {!loading && !erro && (
            <section className="lista-comunidades-container">
                {comunidadeFiltrada.map(comunidade =>
                    <CardComunidade
                        key={comunidade.id}
                        id={comunidade.id}
                        title={comunidade.title}
                        description={comunidade.description}
                        image={comunidade.coverImage}                      
                        members={comunidade.members}
                    />
                )}
                {comunidadeFiltrada.length === 0 &&
                    <p>
                        Nenhuma comunidade encontrada.
                    </p>
                } 
            </section>
            )}
        </>
    );
}
