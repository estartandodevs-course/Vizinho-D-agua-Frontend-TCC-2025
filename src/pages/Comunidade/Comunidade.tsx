import { useEffect, useState } from "react";
import Abas from "../../components/abas/abas";
import BarraTopo from "../../components/BarraTopo/BarraTopo";
import Busca from "../../components/Busca/Busca";
import CardComunidade from "../../components/CardComunidade/CardComunidade";
import Carregando from "../../components/Carregando/Carregando";

import { listarComunidadesAPI, type ComunidadeAPI } from "../../services/comunidade.services"; 

export default function Comunidade() {
    const abasDaPagina = ["Explorar", "Seguindo"];
    const [abaAtiva, setAbaAtiva] = useState(abasDaPagina[0]);
    const [busca, setBusca] = useState("");

    const [comunidades, setComunidades] = useState<ComunidadeAPI[]>([]); 
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function carregarComunidades() {
            setLoading(true);
            setErro("");
            
            try {
                
                const dadosAPI = await listarComunidadesAPI(); 
                setComunidades(dadosAPI);
            } catch (error: any) {
            
                setErro(error.message); 
                setComunidades([]); 
            } finally {
                setLoading(false);
            }
        }
        
        carregarComunidades();
    }, []); 

    function filtrarComunidade(lista: ComunidadeAPI[], aba: string) {
        const filtroBusca = (c: ComunidadeAPI) => {
            const termo = busca.toLowerCase();
            return c.title?.toLowerCase().includes(termo) || false;
        };

        if (aba === "Explorar") {
            
            return lista.filter(c => !c.isSeguindo && filtroBusca(c)); 
        }
        
        if (aba === "Seguindo") {
            
            return lista.filter(c => c.isSeguindo && filtroBusca(c));
        }

        return lista.filter(filtroBusca);
    }

    const comunidadeFiltrada = filtrarComunidade(comunidades, abaAtiva);

    function handleTrocarAba(novaAba: string) {
        setAbaAtiva(novaAba);
        setBusca("");
    }

    return (
        <>
            <BarraTopo
                title="Comunidades"
                iconType="menu" 
            />
            
            <Busca 
                placeholder="Buscar por uma comunidade" 
                onSearch={(valor) => setBusca(valor)} 
            />

            <nav>
                <Abas 
                    listaDeAbas={abasDaPagina}
                    abaAtiva={abaAtiva}
                    onAbaClick={handleTrocarAba} 
                />
            </nav>

            {loading && <Carregando />}

            
            {!loading && (
                <section className="lista-comunidades-container">
                    
              
                    {(erro || comunidadeFiltrada.length === 0) && (
                        <p className="error-message">
                      
                            {erro || (comunidades.length === 0 && abaAtiva === "Seguindo" ? "Você ainda não está seguindo nenhuma comunidade." : "Nenhuma comunidade encontrada nesta aba.")}
                        </p>
                    )}

                    {comunidadeFiltrada.map(comunidade => (
                        <CardComunidade
                            key={comunidade.id}
                            id={comunidade.id}
                            title={comunidade.title || "Sem título"}
                            description={comunidade.description || ""}
                            image={comunidade.coverImage}
                            members={comunidade.membersCount || 0}
                            
                        />
                    ))}
                    
                </section>
            )}
        </>
    );
}