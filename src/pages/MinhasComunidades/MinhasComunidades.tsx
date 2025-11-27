import BarraTopo from "../../components/BarraTopo/BarraTopo";
import Busca from "../../components/Busca/Busca";
import CardComunidade from "../../components/CardComunidade/CardComunidade";
import BotaoCriarComunidade from "../../components/BotaoCriarComunidade/BotaoCriarComunidade";
import { useEffect, useState } from "react";
import Carregando from "../../components/Carregando/Carregando";

import { mockComunidades, type Comunidade as ComunidadeMockType } from "../../mocks/comunidades.mock";

import { getComunidades, type Comunidade } from "../../utils/localStorage"; 

type ComunidadeUnificada = Comunidade | ComunidadeMockType;


export default function MinhasComunidades() {
    const [comunidade, setComunidade] =useState<ComunidadeUnificada[]>([]);
    const [busca, setBusca] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() =>{
        async function carregarMinhasComunidades()
        {
            setLoading (true);
            setError ("");
            try{
                await new Promise((resolve) => setTimeout (resolve, 1000));
                
                const comunidadesLocais = getComunidades(); // id: number, image: string | null
                
                const comunidadesMockOwner = mockComunidades.filter((c) => c.isOwner === true); // id: string, image: string

                const comunidadesLocaisFormatadas: ComunidadeMockType[] = comunidadesLocais.map(c => ({
                    ...c,
                    id: String(c.id), 
                    coverImage: c.coverImage || '' 
                })) as ComunidadeMockType[];
                
                const todasMinhasComunidades = [...comunidadesMockOwner, ...comunidadesLocaisFormatadas];
                
                setComunidade (todasMinhasComunidades);
            }
            catch (err) {
                console.error(err);
                setError("Erro ao carregar as comunidades. Por favor, tente novamente.");
            }
            finally {
                setLoading(false);
            }
        }
        carregarMinhasComunidades();
    }, [])

    const comunidadesFiltrada = comunidade.filter((comunidade) =>
        comunidade.title.toLowerCase().includes(busca.toLowerCase())
    );
    
    return(
        <>
        <BarraTopo title="Minhas Comunidades"
        iconType="menu"/>

        <Busca placeholder="Buscar por uma comunidade" onSearch={(valor) => setBusca(valor)}/>

        {loading && <Carregando />}
        
        {error && <p>{error}</p>}

        {!loading && !error && (
        <section className="lista-comunidades-container">
                {comunidadesFiltrada.map(comunidade =>(
                    <CardComunidade
                        key={comunidade.id} 
                        id={String(comunidade.id)} 
                        title={comunidade.title}
                        description={comunidade.description}
                        image={comunidade.coverImage || ''} 
                        members={comunidade.members}
                        isOwner={comunidade.isOwner} 
                    />
                ))}
                {comunidadesFiltrada.length === 0 &&(
                    <p>Nenhuma comunidade encontrada.</p>
                )}
        </section>
        )}
        <BotaoCriarComunidade />
        </>
    )
}