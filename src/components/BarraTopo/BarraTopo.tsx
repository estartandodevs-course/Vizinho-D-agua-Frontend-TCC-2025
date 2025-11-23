import { IconList } from "../../assets/icons"
import { IconVolta } from "../../assets/icons"; 
import "./BarraTopo.css"
import { useMenu } from "../../hooks/useMenu";
import { useNavigate } from "react-router-dom";

type BarraTopoProps = {
    title: string;
    iconType: 'menu' | 'volta';
}

export default function BarraTopo({ title, iconType }: BarraTopoProps) {
    const { toggleMenu } = useMenu();
    const voltar = useNavigate();
    return (
            <header className="barra-topo-container">
                {iconType === 'menu' && 
                <button className="barra-topo-botao-icone"
                onClick={toggleMenu}
                aria-label="Abrir menu">
                    <IconList />
                </button>}
                {iconType === 'volta' &&
                <button className="barra-topo-botao-icone"
                    onClick={() => voltar(-1)}
                    aria-label="Voltar para a página anterior">
                    <IconVolta />
                </button>}
                <h1 className="barra-topo-titulo">{title}</h1>
            </header>
                
    );
}