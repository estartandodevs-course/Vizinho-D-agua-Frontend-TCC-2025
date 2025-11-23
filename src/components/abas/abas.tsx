import "./abas.css";
type AbasProps ={
    listaDeAbas: string[];
    abaAtiva?: string;
    onAbaClick: (aba: string) => void;
}
export default function Abas({ listaDeAbas, abaAtiva, onAbaClick }: AbasProps)
{
    return(
        <div className="abas-container">
            {listaDeAbas.map(aba =>(
                <button key={aba} 
                    className={`aba-item ${abaAtiva === aba ? 'ativa' : ''}`}
                    onClick={() => onAbaClick(aba)}
                    role="tab"
                    aria-selected={abaAtiva === aba}
                >
                    {aba}
                </button>
            ))}
        </div>
    )
}