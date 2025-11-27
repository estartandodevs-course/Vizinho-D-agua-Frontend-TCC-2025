export type Comunidade = {
    id: number;
    title: string;
    description: string;
    coverImage: string | null; 
    members: number; 
    isSeguindo: boolean;
    isOwner: boolean;
};

const LOCAL_STORAGE_KEY = 'minhasComunidades';

/**
 * Carrega a lista de comunidades do localStorage.
 * @returns {Comunidade[]} 
 */
export function getComunidades(): Comunidade[] {
    try {
        const comunidadesJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
        return comunidadesJSON ? JSON.parse(comunidadesJSON) : [];
    } catch (e) {
        console.error("Erro ao carregar comunidades do localStorage:", e);
        return [];
    }
}

/**
 * Salva a lista de comunidades atualizada no localStorage.
 * @param {Comunidade[]} comunidades 
 */
export function saveComunidades(comunidades: Comunidade[]): void {
    try {
        const comunidadesJSON = JSON.stringify(comunidades);
        localStorage.setItem(LOCAL_STORAGE_KEY, comunidadesJSON);
    } catch (e) {
        console.error("Erro ao salvar comunidades no localStorage:", e);
    }
}
