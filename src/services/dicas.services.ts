import { api } from './api';
// --- SERVIÇO DE LISTAGEM DE CONTEÚDO EDUCACIONAL ---

export async function listarConteudoEducacionalAPI(): Promise<any[]> {
    try {
        console.log("📡 Buscando conteúdo educacional...");
        
        const response = await api.get('/api/EducationContent');
        
        console.log("✅ Dados recebidos:", response);

        const responseData = response.data?.data?.content;  // Ajuste conforme a estrutura da resposta da API

        if (!responseData) {
            console.warn("Resposta não contém dados válidos:", response.data);
            return [];
        }

        if (!Array.isArray(responseData)) {
            console.warn("API retornou dados não formatados corretamente.", responseData);
            return [];
        }

        return responseData; // Retorna o conteúdo educacional

    } catch (error: any) {
        console.error("❌ Erro ao listar o conteúdo educacional:", error);
        throw new Error("Erro ao listar o conteúdo educacional.");
    }
}
