import BarraTopo from "../../components/BarraTopo/BarraTopo";
import Busca from "../../components/Busca/Busca";
import Abas from "../../components/abas/abas";
import CardEducacional from "../../components/CardDicas/CardDicas";
import { mockDicas, type Dica } from "../../mocks/dicas.mock";
import { useEffect, useState } from "react";
import Carregando from "../../components/Carregando/Carregando";

export default function Dicas() {
    const abasDaPagina = ["Todos", "Videos", "Documentos"];

    const [abaAtiva, setAbaAtiva] = useState(abasDaPagina[0]);
    const [busca, setBusca] = useState("");
    const [dicas, setDicas] = useState<Dica[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function carregarDicas() {
            setLoading(true);
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setDicas(mockDicas);
            }
            catch (err) {
                console.error(err);
                setError("Erro ao carregar as dicas. Por favor, tente novamente.");
            }
            finally {
                setLoading(false);
            }

        }
        carregarDicas();
    }, [])

    const dicasFiltradas = dicas.filter((dica) =>{
        const filtroAba = abaAtiva === "Videos" ? dica.contentType === "Video" : 
        abaAtiva === "Documentos" ? dica.contentType === "Documento" : true;

        const filtroBusca = dica.title.toLowerCase().includes(busca.toLowerCase());
        return filtroAba && filtroBusca;
    });

    function handleTrocarAba(novaAba: string) {
        setAbaAtiva(novaAba);
        setBusca("");
    }

    return (
        <>
            <BarraTopo
            title="Dicas"
            iconType="menu"
            />

            <Busca placeholder="Buscar conteúdo especifico"
             onSearch={(valor) => setBusca(valor)} />
            
            <nav>
            <Abas listaDeAbas={abasDaPagina}
            abaAtiva={abaAtiva} 
            onAbaClick={handleTrocarAba}
            />
            </nav>

            <section className="lista-dicas-container">
            {loading && <Carregando />}
            {error && <p>{error}</p>}
            {!loading && !error && dicasFiltradas.length === 0 && (
                <p>Nenhum conteúdo encontrado.</p>
            )}

            {!loading && !error &&
                dicasFiltradas.map((dicas) =>(
                    <CardEducacional key={dicas.id}
                    image={dicas.image}
                    title={dicas.title}
                    author={dicas.author}
                    contentType={dicas.contentType}
                    fileUrl={dicas.fileUrl}
                    />
                ))}
            </section>

        </>
    );
}
