
import Abas from "../../components/abas/abas";
import BarraTopo from "../../components/BarraTopo/BarraTopo";
import Busca from "../../components/Busca/Busca";
import { useState } from "react";
import { mockComunidades, type Comunidade } from "../../mocks/comunidades.mock";
import CardComunidade from "../../components/CardComunidade/CardComunidade";

export default function Comunidade() {
    const abasDaPagina = ["Explorar", "Seguindo"];
    const[abaAtiva, setAbaAtiva] = useState(abasDaPagina[0]);

    const comunidadesFiltradas = mockComunidades.filter((comunidade: Comunidade) => {
        if (abaAtiva === "Explorar") {
            return !comunidade.isSeguindo;
        } else if (abaAtiva === "Seguindo") {
            return comunidade.isSeguindo;
        }
    });

    return (
        <>
            <BarraTopo
            title="Comunidades"
            iconType="menu" />
            <Busca placeholder="Buscar por uma comunidade" />
            <nav>
            <Abas listaDeAbas={abasDaPagina}
            abaAtiva={abaAtiva}
            onAbaClick={setAbaAtiva} />
            </nav>
            <section className="lista-comunidades-container">
                {comunidadesFiltradas.map(comunidade =>
                    <CardComunidade
                        key={comunidade.id}
                        id={comunidade.id}
                        title={comunidade.title}
                        description={comunidade.description}
                        image={comunidade.coverImage}                      
                        members={comunidade.members}
                    />
                )}
                  
            </section>
        </>
    );
}
