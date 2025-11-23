import { useState } from "react";
import { mockUser } from "../../mocks/usuario.mock";
import Botao from "../Botao/Botao";
import "./ModalCriarPostagem.css";
type ModalCriarPostagemProps = {
    comunidadeNome: string;
    onClose: () => void;

}


export default function ModalCriarPostagem({comunidadeNome, onClose}: ModalCriarPostagemProps) {
    const [texto, setTexto] = useState("");
    const usuario = mockUser;

    const handlerPostar = () =>{
        console.log(`Postado na comunidade ${comunidadeNome} pelo usuário ${usuario.name}: ${texto}`);
        onClose();
    }

    return(
        <div className="modal-post-overlay">
            <header className="modal-post-header">
                <button type="button" onClick={onClose} className="modal-post-close-button">
                    Cancelar
                </button>
                <Botao onClick={handlerPostar} variante="primario"
                className="modal-post-postar"
            >
                    Postar
                </Botao>
            </header>

            <main className="modal-post-corpo">
                <img src={usuario.profileImage}
                alt={usuario.name}
                className="modal-post-avatar"/>
                
                <textarea 
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder="Escreva algo..."
                    className="modal-post-textarea"
                    autoFocus
                    />

            </main>
            
        </div>
    )
}