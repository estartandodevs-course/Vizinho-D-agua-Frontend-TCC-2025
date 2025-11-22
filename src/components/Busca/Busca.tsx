import { IconMagnifyingGlass } from "../../assets/icons";
import './Busca.css'
type BuscaProps = {
    placeholder: string;
}

export default function Busca({ placeholder }: BuscaProps) {
    return(
        <form className="busca-container" onSubmit={(e) => e.preventDefault()}>
            <input type="text" className="busca-input" placeholder={placeholder}></input>
            <div className="busca-icone-wrapper">
                <button type="submit" className="busca-botao-submit">
                    <IconMagnifyingGlass className="busca-icone-svg"/>
                </button>
            </div>
        </form>
    );
}
