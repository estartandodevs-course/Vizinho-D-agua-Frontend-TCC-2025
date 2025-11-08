import { createContext, useState } from "react";
import type { ReactNode } from "react";

type MenuContextType = {
    estaAberto: boolean;
    toggleMenu: () => void;
}

export const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({children}: {children: ReactNode}) {
    const [estaAberto, setEstaAberto] = useState(false);

    const toggleMenu = () => {
        setEstaAberto(aberto => !aberto);
    }
    return(
        <MenuContext.Provider value={{estaAberto, toggleMenu}}>
            {children}
        </MenuContext.Provider>
    );
}
