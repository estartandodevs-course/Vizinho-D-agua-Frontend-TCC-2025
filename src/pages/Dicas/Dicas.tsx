import BarraTopo from "../../components/BarraTopo/BarraTopo";
import Busca from "../../components/Busca/Busca";
import Abas from "../../components/abas/abas";
import CardEducacional from "../../components/CardDicas/CardDicas";
import { mockDicas, type Dica } from "../../mocks/dicas.mock";
import { useState } from "react";

export default function Dicas() {
    const abasDaPagina = ["Todos", "Videos", "Documentos"];

    const [abaAtiva, setAbaAtiva] = useState(abasDaPagina[0]);

    const dicasFiltradas = mockDicas.filter((dica: Dica) =>{
        if(abaAtiva === "Videos")
        {
            return dica.contentType === "Video";
        }
        if(abaAtiva === "Documentos")
        {
            return dica.contentType === "Documento";
        }
        return true;
    });

    return (
        <>
            <BarraTopo
            title="Dicas"
            iconType="menu"
            />
            <Busca placeholder="Buscar conteúdo especifico" />
            <nav>
            <Abas listaDeAbas={abasDaPagina}
            abaAtiva={abaAtiva} 
            onAbaClick={setAbaAtiva}
            />
            </nav>
            <section className="lista-dicas-container">
                {dicasFiltradas.map(dicas =>(
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
