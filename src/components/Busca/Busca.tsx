import { IconMagnifyingGlass } from "../../assets/icons";
import './Busca.css'
import { useState } from "react";

type BuscaProps = {
    placeholder: string;
    onSearch?: (valor: string) => void;
}

export default function Busca({ placeholder, onSearch }: BuscaProps) {
    const [valor, setValor] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch?.(valor.trim().toLowerCase());
    };
    return(
        <form className="busca-container" onSubmit={handleSubmit}>
            <input type="text" 
            className="busca-input" 
            placeholder={placeholder} value={valor} 
            onChange={e => setValor(e.target.value)}></input>
            <div className="busca-icone-wrapper">
                <button type="submit" className="busca-botao-submit">
                    <IconMagnifyingGlass className="busca-icone-svg"/>
                </button>
            </div>
        </form>
    );
}
