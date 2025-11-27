import BarraTopo from "../../components/BarraTopo/BarraTopo";
import Busca from "../../components/Busca/Busca";
import CardComunidade from "../../components/CardComunidade/CardComunidade";
import BotaoCriarComunidade from "../../components/BotaoCriarComunidade/BotaoCriarComunidade";
import { useEffect, useState } from "react";
import Carregando from "../../components/Carregando/Carregando";

import { listarComunidadesAPI, type ComunidadeAPI } from '../../services/comunidade.services'; 

export default function MinhasComunidades() {
    const [comunidade, setComunidade] = useState<ComunidadeAPI[]>([]);
    const [busca, setBusca] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() =>{
        async function carregarMinhasComunidades()
        {
            setLoading (true);
            setError (""); 
            
            try{
                const listaDaAPI = await listarComunidadesAPI();
                
              
                const comunidadesDoUsuario = listaDaAPI.filter((c: ComunidadeAPI) => c.isOwner === true);

                setComunidade(comunidadesDoUsuario);
                
            }
            catch (err: any) {
              
                setError(err.message || "Não foi possível carregar as comunidades.");
                setComunidade([]);
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
        

        {!loading && (
        <section className="lista-comunidades-container">
                {comunidadesFiltrada.map(comunidade =>(
                    <CardComunidade
                        key={comunidade.id}
                        id={comunidade.id}
                        title={comunidade.title}
                        description={comunidade.description}
                        image={comunidade.coverImage}
                        members={comunidade.membersCount} 
                    />
                ))}
            
            
                {comunidadesFiltrada.length === 0 &&(
                    <p>{error ? "Nenhuma comunidade disponível." : "Nenhuma comunidade encontrada."}</p>
                )}
        </section>
        )}
        <BotaoCriarComunidade />
        </>
    )
}