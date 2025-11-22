import { Link } from "react-router-dom";
import { IconUsersThreeBranco } from "../../assets/icons";
import "./BotaoCriarComunidade.css";

type Props ={
    to?: string;
    className?: string;
}
export default function BotaoCriarComunidade({ to = "/criar-comunidade", className = "botao-criar-comunidade-container" }: Props) {
    return(
        <Link to={to} className={`botao-criar-comunidade-container ${className}`}>
            <IconUsersThreeBranco />
        </Link>
    )
}