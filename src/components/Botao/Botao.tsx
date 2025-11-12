import './Botao.css';

type BotaoProps = {
    onClick?: () => void;
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    variante?: 'primario' | 'sucesso';
}

export default function Botao({ onClick, children, type = 'button', variante = 'primario' }: BotaoProps) {
    return(
        <button
            className={`botao-container ${variante}`}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
}