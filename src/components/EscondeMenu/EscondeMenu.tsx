import "./EscondeMenu.css"
import { useMenu } from "../../hooks/useMenu";

export default function EscondeMenu() {
    const {estaAberto, toggleMenu} = useMenu();
    if(!estaAberto){
        return null;
    }
    return (
        <div
            className="esconde-menu-fundo"
            onClick={toggleMenu}
        >

        </div>
    )
}