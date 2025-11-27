import Abas from "../../components/abas/abas";
import BarraTopo from "../../components/BarraTopo/BarraTopo";
import Busca from "../../components/Busca/Busca";
import { useEffect, useState } from "react";

import { mockComunidades, type Comunidade as ComunidadeMockType } from "../../mocks/comunidades.mock"; 
import CardComunidade from "../../components/CardComunidade/CardComunidade";
import Carregando from "../../components/Carregando/Carregando";

import { getComunidades, type Comunidade } from "../../utils/localStorage"; 


type ComunidadeLocal = {
    id: number;
    title: string;
    description: string;
    coverImage: string | null; 
    members: number; 
    isSeguindo: boolean;
    isOwner: boolean;
};

type ComunidadeUnificada = Comunidade | ComunidadeMockType;

export default function Comunidade() {
    const abasDaPagina = ["Explorar", "Seguindo"];
    const[abaAtiva, setAbaAtiva] = useState(abasDaPagina[0]);
    const [busca, setBusca] = useState("");

    const [comunidade, setComunidade] = useState<ComunidadeUnificada[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function carregarComunidade() {
            try{
                await new Promise((resolve) => setTimeout(resolve, 300));
                
                const comunidadesLocaisRaw = getComunidades() as ComunidadeLocal[];

                const comunidadesLocaisCompativel: ComunidadeMockType[] = comunidadesLocaisRaw.map(c => ({
                    ...c,
                    id: String(c.id), 
                    coverImage: c.coverImage || '' 
                })) as ComunidadeMockType[];

                const idsLocais = new Set(comunidadesLocaisCompativel.map(c => c.id));

                const mocksFiltrados = mockComunidades.filter(
                    mock => !idsLocais.has(mock.id) 
                );

                const todasComunidades: ComunidadeUnificada[] = [...mocksFiltrados, ...comunidadesLocaisCompativel];
                
                setComunidade(todasComunidades);
            }catch(error) {
                console.error(error);
                setErro("Erro ao carregar comunidades:");
            }
            finally{
                setLoading(false);
            }
        }
        carregarComunidade();
    }, []); 

    function filtrarComunidade(lista: ComunidadeUnificada[], aba: string) {
        const filtroBusca = (c: ComunidadeUnificada) =>
            c.title.toLowerCase().includes(busca.toLowerCase());
            
        if (aba === "Explorar") return lista.filter(c => !c.isSeguindo && filtroBusca(c));
        if (aba === "Seguindo") return lista.filter(c => c.isSeguindo && filtroBusca(c));
        
        return lista.filter(filtroBusca);
    }
    const comunidadeFiltrada = filtrarComunidade(comunidade, abaAtiva);


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
                        id={String(comunidade.id)}
                        title={comunidade.title}
                        description={comunidade.description}
                        image={comunidade.coverImage || ''}
                        members={comunidade.members}
                        isOwner={comunidade.isOwner}
                        isSeguindo={comunidade.isSeguindo}
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