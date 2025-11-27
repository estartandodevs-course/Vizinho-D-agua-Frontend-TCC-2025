import { useState } from "react";
import { mockUser } from "../../mocks/usuario.mock";
import Botao from "../Botao/Botao";
import "./ModalCriarPostagem.css";
// Importando o serviço da API
import { criarPostagemAPI } from "../../services/comunidade.services"; 

type ModalCriarPostagemProps = {
    comunidadeNome: string;
    comunidadeId: string; // Obrigatório receber o ID do Pai
    onClose: () => void;
}

export default function ModalCriarPostagem({ comunidadeNome, comunidadeId, onClose }: ModalCriarPostagemProps) {
    // LOG DE DEBUG: Para confirmar se o Pai enviou o ID corretamente
    console.log("🛠️ [MODAL] Abrindo modal para a comunidade ID:", comunidadeId);

    const [texto, setTexto] = useState("");
    const [loading, setLoading] = useState(false);
    
    // Usuário visual (mock) apenas para mostrar a foto
    const usuario = mockUser;

    const handlerPostar = async () => {
        if (!texto.trim()) return;

        try {
            setLoading(true);
            
            // ID DO USUÁRIO REAL (Copiado do seu Banco de Dados)
            const userIdDoBanco = "c1410944-9739-4477-a721-e699563396a3"; 

            console.log(`📤 [MODAL] Enviando post... Comunidade: ${comunidadeId}, Autor: ${userIdDoBanco}`);

            // Chamada API
            await criarPostagemAPI({
                communityId: comunidadeId,
                authorId: userIdDoBanco,
                content: texto,
                images: []
            });

            alert("Postado com sucesso!");
            onClose();
            
            // Recarrega a página para atualizar a lista de posts
            window.location.reload(); 

        } catch (error) {
            console.error(error);
            alert("Erro ao postar. Verifique o console.");
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
                    src={usuario.profileImage}
                    alt={usuario.name}
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