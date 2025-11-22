import { NavLink, Link, useLocation } from "react-router-dom";
import "./NavBar.css";
import { IconHouse, IconLightbulbFilament, IconMegaphone, IconUsersThree } from "../../assets/icons";
export default function NavBar() {
    const {pathname} = useLocation();

    const isDenunciaAtiva = 
    pathname === "/denuncias" ||
    pathname.startsWith("/criar-denuncia") ||
    pathname.startsWith("/editar-denuncia/");
    return(
            <nav className="nav-bar-container">
                <ul>
                    <li>
                        <NavLink to="/" className="nav-link">
                            <IconHouse />
                            <span>Alertas</span>
                        </NavLink>
                    </li>
                    <li>
                        <Link to="denuncias" className={`nav-link ${isDenunciaAtiva ? 'active' : ''}`}>
                            <IconMegaphone />
                            <span>Denúncias</span>
                        </Link>
                    </li>
                    <li>
                        <NavLink to="comunidade" className="nav-link">
                            <IconUsersThree />
                            <span>Comunidade</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="dicas" className="nav-link">
                            <IconLightbulbFilament />
                            <span>Dicas</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
    )
}
