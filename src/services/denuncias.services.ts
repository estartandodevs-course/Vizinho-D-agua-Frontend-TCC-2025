import { api } from './api';
import type { Denuncia } from '../mocks/denuncias.mock';

// --- TIPAGEM DE ENDEREÇO ---
export interface EnderecoCompleto {
    postalCode: string;
    stateCode: string;
    city: string;
    neighborhood: string;
    road: string;
    lat?: number;
    lon?: number;
}
// ----------------------------------------------------------------------

// --- TIPAGENS DTO ---

export interface CriarDenunciaDTO {
    description: string;
    waterCompanyRelated?: string;
    reportType: string | number;
    reporterId?: string;
    postalCode?: string;
    stateCode?: string;
    city?: string;
    neighborhood?: string;
    road?: string;
    lat?: number;
    lon?: number;
}

export interface EditarDenunciaDTO {
    description?: string;
    waterCompanyRelated?: string;
    reportType?: string | number;
    postalCode?: string;
    stateCode?: string;
    city?: string;
    neighborhood?: string;
    road?: string;
    lat?: number;
    lon?: number;
}

// ----------------------------------------------------------------------
// --- FUNÇÕES DE FORMATACÃO ---
// ----------------------------------------------------------------------

function formatarTipoDoBackend(tipoBackend: string | number): string {
    switch (tipoBackend) {
        case 0: case "0": return "Falta de água";
        case 1: case "1": return "Baixa pressão";
        case 2: case "2": return "Vazamento identificado";
        case 3: case "3": return "Desperdício de água";
        case 4: case "4": return "Água com coloração ou odor estranho";
        case 5: case "5": return "Problemas na rede de abastecimento";
        case "FaltaDeAgua": return "Falta de água";
        default: return "Outro tipo de denúncia";
    }
}
export function traduzirLabelParaTipoBackend(label: string): number | null {
    switch (label) {
        case "Falta de água": return 0;
        case "Baixa pressão": return 1;
        case "Vazamento identificado": return 2;
        case "Desperdício de água": return 3;
        case "Água com coloração ou odor estranho": return 4;
        case "Problemas na rede de abastecimento": return 5;
        default: return null;
    }
}

function formatarStatusDoBackend(statusBackend: string): 'Em Andamento' | 'Processada' {
    switch (statusBackend) {
        case "InProcessing": return "Em Andamento";
        case "Processed": return "Processada";
        default: return "Em Andamento";
    }
}

// ----------------------------------------------------------------------
// --- SERVIÇO DE BUSCA DE ENDEREÇO (INTEGRAÇÃO DE CEP) ---
// ----------------------------------------------------------------------

export async function buscarEnderecoPorCEP(cep: string): Promise<EnderecoCompleto | null> {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return null;

    await new Promise(resolve => setTimeout(resolve, 300));

    return null;
}

// ----------------------------------------------------------------------
// --- SERVIÇO DE LISTAGEM (GET /api/Report) ---
// ----------------------------------------------------------------------

export async function listarDenunciasAPI(): Promise<Denuncia[]> {
    try {
        const response = await api.get('/api/Report');

        const responseData = response.data?.data?.report || response.data?.data || response.data;

        const listaBruta = Array.isArray(responseData) ? responseData : responseData.reports || responseData.denuncias || [];

        if (!Array.isArray(listaBruta)) {
            return [];
        }

        const listaFormatada: Denuncia[] = listaBruta.map((item: any) => {

            // ===============================================================
            // LOGS DE VERIFICAÇÃO REINTRODUZIDOS
            // ===============================================================
            console.log("--- DADOS BRUTOS DA DENÚNCIA ATUAL ---");
            console.log("Objeto Completo:", item);
            console.log(`Verificando neighborhood: '${item.neighborhood}', city: '${item.city}', postalCode: '${item.postalCode}'`);
            // ===============================================================

            return {
                id: item.id,
                reportType: formatarTipoDoBackend(item.reportType),
                description: item.description,
                company: item.waterCompanyRelated || "Não Informada",
                // Esta lógica pega o primeiro valor não vazio que encontra:
                location: item.neighborhood || item.road || item.city || item.postalCode || "Sem localização",
                status: formatarStatusDoBackend(item.status),
                createdAt: new Date(item.createdAt || Date.now()).toLocaleDateString(),
                linkType: formatarStatusDoBackend(item.status) === "Processada" ? 'Ver Detalhes' : 'Editar',
                attachments: item.attachments || []
            };
        });

        return listaFormatada;

    } catch (error: any) {
        if (error.response) {
            throw new Error(`Erro na API: ${error.response.status} - ${error.response.data?.title || 'Erro interno'}`);
        } else if (error.request) {
            throw new Error("Erro de rede. Verifique sua conexão.");
        } else {
            throw new Error("Erro desconhecido ao carregar as denúncias.");
        }
    }
}

// ----------------------------------------------------------------------
// --- SERVIÇO DE BUSCA POR ID (GET /api/Report/{id}) ---
// ----------------------------------------------------------------------

export async function buscarDenunciaPorId(id: string): Promise<any> {
    try {
        const response = await api.get(`/api/Report/${id}`);

        if (response.status !== 200) {
            throw new Error("Erro ao buscar a denúncia");
        }

        return response.data.data || response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Erro ao buscar a denúncia.";
        throw new Error(errorMessage);
    }
}

// ----------------------------------------------------------------------
// --- SERVIÇO DE CRIAÇÃO (POST /api/Report) ---
// ----------------------------------------------------------------------

export async function criarDenunciaAPI(formData: FormData): Promise<any> {
    try {
        const response = await api.post('/api/Report', formData);

        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error(`Erro ao criar a denúncia. Status: ${response.status}`);
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.detail || error.response?.data?.message || error.message;
        throw new Error(`Erro ao criar a denúncia: ${errorMessage}`);
    }
}


// ----------------------------------------------------------------------
// --- SERVIÇO DE ATUALIZAÇÃO (PUT /api/Report/{id}) ---
// ----------------------------------------------------------------------

/**
 * Atualiza uma denúncia. Espera um objeto JSON com os dados a serem alterados.
 * Se o 'postalCode' for o único campo de endereço enviado, o backend deve auto-completar.
 * @param id O ID da denúncia a ser atualizada.
 * @param data Os dados a serem atualizados (pode ser apenas { postalCode: '...' }).
 */
export async function atualizarDenunciaAPI(id: string, data: Partial<CriarDenunciaDTO>): Promise<any> {
    try {
        // Envia os dados como JSON no corpo da requisição PUT
        const response = await api.put(`/api/Report/${id}`, data);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Erro ao atualizar a denúncia. Status: ${response.status}`);
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.detail || error.response?.data?.message || error.message;
        throw new Error(`Erro ao atualizar a denúncia: ${errorMessage}`);
    }
}

// ----------------------------------------------------------------------
// --- FUNÇÃO PARA OBTER ID DO USUÁRIO ---
// ----------------------------------------------------------------------

export async function buscarUsuarioAtual(): Promise<string> {
    const ID_FIXO_PARA_FALLBACK = "c1410944-9739-4477-a721-e699563396a3";

    try {
        const response = await api.get('/api/User');
        const userData = response.data?.data?.users || response.data?.data || response.data;

        const listaBruta = Array.isArray(userData) ? userData : userData.users || [];

        if (listaBruta.length > 0 && listaBruta[0].id) {
            return listaBruta[0].id;
        }

        return ID_FIXO_PARA_FALLBACK;

    } catch {

        return ID_FIXO_PARA_FALLBACK;
    }
}