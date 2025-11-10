import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { IconHouse, IconLightbulbFilament, IconMegaphone, IconUsersThree } from "../../assets/icons";
export default function NavBar() {
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
                        <NavLink to="denuncias" className="nav-link">
                            <IconMegaphone />
                            <span>Denúncias</span>
                        </NavLink>
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
