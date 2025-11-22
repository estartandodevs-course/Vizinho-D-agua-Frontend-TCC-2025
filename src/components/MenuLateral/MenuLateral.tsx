import "./MenuLateral.css"
import { useMenu } from "../../hooks/useMenu";
import {mockUser} from "../../mocks/usuario.mock";
import { IconContact, IconGearSix, IconHeadset, IconInfo, IconUserCircle, IconUsersThree } from "../../assets/icons";
import { Link } from "react-router-dom";

export default function MenuLateral() {
    const { estaAberto, toggleMenu } = useMenu();

    const usuario = mockUser;

    return(
        <aside className={`menu-lateral-container ${estaAberto ? 'aberto' : ''}`}>
        
            <div className="menu-lateral-perfil">
                <img src={usuario.profileImage} alt={usuario.name} 
                className="menu-lateral-avatar"/>
                <div className="menu-lateral-perfil-texto">
                    <span className="menu-lateral-nome">{usuario.name}</span>
                    <span className="menu-lateral-email">{usuario.email}</span>
                </div>
            </div>
            <nav className="menu-lateral-links">
                <ul>
                    <li><IconUserCircle /><Link to="#">Meu Perfil</Link></li>
                    <li><IconGearSix /><Link to="#">Configurações</Link></li>
                    <li><IconUsersThree /><Link to="/minhas-comunidades">Minhas comunidades</Link></li>
                    <li><IconContact/><Link to="/contatos" onClick={toggleMenu}>Contato</Link></li>
                    <li><IconInfo /><Link to="#">Sobre</Link></li>
                    <li><IconHeadset /><Link to="#">Central de Ajuda</Link></li>
                </ul>
            </nav>
            <footer className="menu-lateral-footer">
                <img src="/logo.png" alt="Logo" />
            </footer>
        </aside>

    )
}
