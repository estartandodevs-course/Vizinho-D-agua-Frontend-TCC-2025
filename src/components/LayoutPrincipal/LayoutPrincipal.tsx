import { Outlet } from "react-router-dom";
import EscondeMenu from "../EscondeMenu/EscondeMenu";
import MenuLateral from "../MenuLateral/MenuLateral";
import NavBar from "../NavBar/NavBar";
import './../../App.css';
export default function LayoutPrincipal()
{
    return (
        <>
            <MenuLateral />
            <EscondeMenu />
            <main className="container-conteudo-pagina">
                <Outlet />
            </main>

            <NavBar />
        </>
    )
}