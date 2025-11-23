import './Botao.css';

type BotaoProps = {
    onClick?: () => void;
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    variante?: 'primario' | 'sucesso';
    className?: string;
}

export default function Botao({ onClick, children, type = 'button', variante = 'primario', className }: BotaoProps) {
    const classesDeBotao = `botao-container ${variante} ${className || ''}`;
    
    return(
        <button
            className={classesDeBotao}
            type={type}
            onClick={onClick}
            aria-label={typeof children === 'string' ? undefined : 'Botão'}
        >
            {children}
        </button>
    )
}