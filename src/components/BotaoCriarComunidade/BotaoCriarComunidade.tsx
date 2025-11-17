import { Link } from "react-router-dom";
import { IconUsersThreeBranco } from "../../assets/icons";
import "./BotaoCriarComunidade.css";

export default function BotaoCriarComunidade() {
    return(
        <Link to="/criar-comunidade" className="botao-criar-comunidade-container">
            <IconUsersThreeBranco />
        </Link>
    )
}