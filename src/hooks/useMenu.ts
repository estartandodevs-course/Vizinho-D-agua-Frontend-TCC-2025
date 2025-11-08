import { useContext } from "react";
import { MenuContext } from "../contexts/MenuContext";

export function useMenu(){
    const context = useContext(MenuContext);
    if(!context){
        throw new Error("useMenu deve ser usado dentro de um MenuProvider");
    }
return context; 
}