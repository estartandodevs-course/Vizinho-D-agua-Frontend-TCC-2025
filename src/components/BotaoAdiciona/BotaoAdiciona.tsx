import { Link } from "react-router-dom";
import "./BotaoAdiciona.css";
import { IconWaterDrop } from "../../assets/icons";
export default function BotaoAdiciona() {
    return(
        <Link to="/criar-denuncia" className="botao-adiciona-container">
            <IconWaterDrop />
        </Link>
    )
}
