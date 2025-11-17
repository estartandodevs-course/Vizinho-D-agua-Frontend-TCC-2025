import { mockComunidades, type Comunidade } from "../../mocks/comunidades.mock";
import BarraTopo from "../../components/BarraTopo/BarraTopo";
import Busca from "../../components/Busca/Busca";
import CardComunidade from "../../components/CardComunidade/CardComunidade";
import BotaoCriarComunidade from "../../components/BotaoCriarComunidade/BotaoCriarComunidade";
export default function MinhasComunidades() {

    const comunidadesFiltradas = mockComunidades.filter((comunidade: Comunidade) => {
        
        return comunidade.isOwner === true;
    })
    return(
        <>
        <BarraTopo title="Minhas Comunidades"
        iconType="menu"/>

        <Busca placeholder="Buscar por uma comunidade"/>

        <section className="lista-comunidades-container">
            {comunidadesFiltradas.map(comunidade =>
                <CardComunidade 
                key={comunidade.id}
                id={comunidade.id}
                title={comunidade.title}
                description={comunidade.description}
                image={comunidade.coverImage}
                membros={comunidade.membros}
                />
            )}
        </section>

        <BotaoCriarComunidade />
        </>
    )
}