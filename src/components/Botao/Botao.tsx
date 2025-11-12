import './Botao.css';

type BotaoProps = {
    onClick?: () => void;
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
}

export default function Botao({ onClick, children, type = 'button' }: BotaoProps) {
    return(
        <button
            className="botao-container"
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
}