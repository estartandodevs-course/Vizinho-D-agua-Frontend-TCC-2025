import { IconList } from "../../assets/icons"
import { IconMagnifyingGlass } from "../../assets/icons"; 
import "./BarraTopo.css"
import { useMenu } from "../../hooks/useMenu";

type BarraTopoProps = {
    title: string;
    iconType: 'menu' | 'busca';
}

export default function BarraTopo({ title, iconType }: BarraTopoProps) {
    const { toggleMenu } = useMenu();
    return (
        <div>
            <header className="barra-topo-container">
                {iconType === 'menu' && 
                <button className="barra-topo-botao-icone"
                onClick={toggleMenu}>
                    <IconList />
                </button>}
                {iconType === 'busca' &&
                <button className="barra-topo-botao-icone">
                    <IconMagnifyingGlass />
                </button>}
                <h1 className="barra-topo-titulo">{title}</h1>
            </header>
                
        </div>
    );
}