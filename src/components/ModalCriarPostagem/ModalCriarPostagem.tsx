import { useState } from "react";
import { mockUser } from "../../mocks/usuario.mock";
import Botao from "../Botao/Botao";
import "./ModalCriarPostagem.css";

import { getPostagens, savePostagens, type CommunityPost } from "../../utils/localStoragePostagens"; 

type ModalCriarPostagemProps = {
    comunidadeNome: string;
    communityId: string; 
    onClose: () => void;
    onPostCreated: () => void; 
}


export default function ModalCriarPostagem({comunidadeNome, communityId, onClose, onPostCreated}: ModalCriarPostagemProps) {
    const [texto, setTexto] = useState("");
    const usuario = mockUser; 

    const handlerPostar = () =>{
        if (!texto.trim()) return;

        const novaPostagem: CommunityPost = {
            id: String(Date.now()), 
            communityId: communityId,
            content: texto,
            createdAt: new Date().toISOString(), 
            author: { 
                id: usuario.id, 
                name: usuario.name,
                profileImage: usuario.profileImage
            }
        };
        
        const postagensAtuais = getPostagens();
        postagensAtuais.unshift(novaPostagem); 
        savePostagens(postagensAtuais);
        
        onPostCreated(); 
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
                    placeholder={`Escreva algo na comunidade  ${comunidadeNome}...`}
                    className="modal-post-textarea"
                    autoFocus
                    />

            </main>
            
        </div>
    )
}