import BarraTopo from "../../components/BarraTopo/BarraTopo";
import { mockDenuncias } from "../../mocks/denuncias.mock";
import CardDenuncia from "../../components/CardDenuncia/CardDenuncia";
import BotaoAdiciona from "../../components/BotaoAdiciona/BotaoAdiciona";
export default function Denuncias() {
    return (
        <>
            <BarraTopo 
            title="Denúncias"
            iconType="menu"/>
        <section className="lista-denuncias-container">
            {mockDenuncias.map(denuncia => (
                <CardDenuncia key={denuncia.id}
                title={denuncia.title}
                location={denuncia.location}
                date={denuncia.date}
                status={denuncia.status}
                linkType={denuncia.linkType}
                />
            ))}
        </section>
            <BotaoAdiciona />
        </>
    );
}
