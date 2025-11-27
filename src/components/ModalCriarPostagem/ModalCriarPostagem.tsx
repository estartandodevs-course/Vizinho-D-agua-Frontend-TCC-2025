import { useState, useEffect } from "react"; 
import Botao from "../Botao/Botao";
import "./ModalCriarPostagem.css";

import { criarPostagemAPI } from "../../services/comunidade.services"; 
import { buscarUsuarioAtual } from "../../services/comunidade.services"; 

const mockUser = {
    name: "Usuário Atual",
    profileImage: "/JorgePerfil.png" 
};

type ModalCriarPostagemProps = {
    comunidadeNome: string;
    comunidadeId: string; 
    onClose: () => void;
}

export default function ModalCriarPostagem({ comunidadeNome, comunidadeId, onClose }: ModalCriarPostagemProps) {
    
    const [texto, setTexto] = useState("");
    const [loading, setLoading] = useState(false);
    const [authorId, setAuthorId] = useState<string | null>(null);
    
  
    useEffect(() => {
        buscarUsuarioAtual().then(id => setAuthorId(id)).catch(() => setAuthorId(null));
    }, []);

    const isPostagemValida = texto.trim().length > 0 && !!authorId;

    const handlerPostar = async () => {
        if (!isPostagemValida) {
            if (!authorId) alert("Erro: ID do autor não carregado. Tente novamente.");
            return;
        }

        try {
            setLoading(true);
            

            await criarPostagemAPI({
                communityId: comunidadeId,
                authorId: authorId!, 
                content: texto,
                images: []
            });

            alert("Postado com sucesso!");
            onClose();
            window.location.reload(); 

        } catch (error) {
            const errorMsg = (error as Error).message || "Erro desconhecido ao postar.";
            console.error(error);
            console.log(`Falha ao postar: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="modal-post-overlay">
            <header className="modal-post-header">
                <button type="button" onClick={onClose} className="modal-post-close-button">
                    Cancelar
                </button>
                <Botao 
                    onClick={handlerPostar} 
                    variante="primario"
                    className="modal-post-postar"
             
                   
                >
                    {loading ? "Enviando..." : "Postar"}
                </Botao>
            </header>
          
            <main className="modal-post-corpo">
              
                <img 
                    src={mockUser.profileImage}
                    alt={mockUser.name}
                    className="modal-post-avatar"
                />

                <textarea 
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder={`Escreva algo para ${comunidadeNome}...`}
                    className="modal-post-textarea"
                    autoFocus
                    disabled={loading}
                />
            </main>
        </div>
    )
}