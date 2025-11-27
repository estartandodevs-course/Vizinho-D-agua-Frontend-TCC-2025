import { api } from './api';


// --- TIPAGENS ---

export interface PostagemAPI {
    id: string;
    content: string;
    images: string[];
    communityId: string;
    createdAt: string;
    author: {
        id: string;
        name: string;
        profileImage: string;
    };
}

export interface ComunidadeAPI {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    membersCount: number;
    isSeguindo?: boolean;
    isOwner?: boolean;
}

export interface CriarPostagemDTO {
    authorId: string;
    communityId: string;
    content: string;
    images?: string[];
}

export interface CriarComunidadeDTO {
    title: string;
    description: string;
    coverImage?: string; 
}

export interface EditarComunidadeDTO {
    title?: string;
    description?: string;
    coverImage?: string; 
}

// ----------------------------------------------------------------------
// --- UPLOAD DE IMAGEM (SIMULADA) ---
// ----------------------------------------------------------------------

async function uploadImage(file: File): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return `https://vizinhodagua.com/covers/${Date.now()}-${file.name.replace(/\s/g, "")}`;
}


// ----------------------------------------------------------------------
// --- SERVIÇOS DE COMUNIDADE (CRUD) ---
// ----------------------------------------------------------------------

export async function listarComunidadesAPI(): Promise<ComunidadeAPI[]> {
    try {
        console.log("Tentando buscar comunidades...");
        const response = await api.get('/api/Community'); 
        
        let listaNoBackend: any = response.data;


        if (listaNoBackend?.data?.communities && Array.isArray(listaNoBackend.data.communities)) {
            listaNoBackend = listaNoBackend.data.communities;
        } else if (listaNoBackend?.communities && Array.isArray(listaNoBackend.communities)) {
            listaNoBackend = listaNoBackend.communities;
        } else if (listaNoBackend?.data && Array.isArray(listaNoBackend.data)) {
            listaNoBackend = listaNoBackend.data;
        }
        
        if (Array.isArray(listaNoBackend)) {
          console.log(`Sucesso! ${listaNoBackend.length} comunidades encontradas.`);
            return listaNoBackend.map((item: any) => ({
                id: item.id,
                title: item.title,
                description: item.description,
                coverImage: item.coverImage,
                membersCount: item.followers?.length ?? item.membersCount ?? 0,
                isSeguindo: item.isSeguindo ?? false, 
                isOwner: item.isOwner ?? false
            }));
        }
        
        console.warn("API retornou sucesso (200), mas os dados não são um array mapeável.");
        return [];
        
    } catch (error: any) {
        console.error("--- ERRO NA REQUISIÇÃO DE COMUNIDADES (Backend/Rede) ---");
        
     
        if (error.response) {
       
            console.error(`Status HTTP: ${error.response.status}`);
            console.error("Dados da Resposta de Erro (pode ser o stack trace ou mensagem do 500):", error.response.data);
            
        
            if (error.response.status === 500) {
                throw new Error("Erro 500: Falha interna no servidor ao buscar comunidades. O problema não é no formato da requisição.");
            }
            throw new Error(`Erro ${error.response.status}: Falha ao buscar comunidades.`);
        } else if (error.request) {
       
            console.error("Não houve resposta do servidor. Verifique a URL e CORS.");
            throw new Error("Erro de Rede ou CORS: Não foi possível alcançar o servidor.");
        } 
        
       
        console.error("Erro Geral:", error.message);
        throw new Error(error.message || "Falha na comunicação com a API de comunidades.");
    }
}

export async function obterComunidadePorId(id: string): Promise<ComunidadeAPI> {
    
    const response = await api.get(`/api/Community/${id}`);
    
    const item = response.data?.data || response.data;

    if (!item) {
        throw new Error("Comunidade não encontrada.");
    }

    return {
        id: item.id || id, 
        title: item.title || "Comunidade Sem Nome",
        description: item.description || "",
        coverImage: item.coverImage || "",
        membersCount: item.followers ? item.followers.length : 0,
        isSeguindo: item.isSeguindo ?? false,
        isOwner: item.isOwner ?? false 
    };
}

export async function criarComunidadeAPI(dados: CriarComunidadeDTO, bannerFile: File | null): Promise<ComunidadeAPI> {
    let coverImage = "";

    if (bannerFile) {
        coverImage = await uploadImage(bannerFile);
    }
    
    const payload = {
        title: dados.title,
        description: dados.description,
        coverImage: coverImage 
    };
    
    const response = await api.post('/api/Community', payload);
    
    return response.data?.data || response.data; 
}

export async function editarComunidadeAPI(id: string, dados: EditarComunidadeDTO, bannerFile: File | null): Promise<void> {

    let coverImage = dados.coverImage || ""; 
    
    if (bannerFile) {
        coverImage = await uploadImage(bannerFile); 
    }
    
    const payload: EditarComunidadeDTO = {
        title: dados.title,
        description: dados.description,
        coverImage: coverImage 
    };

    await api.put(`/api/Community/${id}`, payload);
}


// ----------------------------------------------------------------------
// --- SERVIÇOS DE POSTAGEM ---
// ----------------------------------------------------------------------

export async function listarPostagensDaComunidade(communityId: string): Promise<PostagemAPI[]> {
    try {
        const response = await api.get('/api/CommunityPost');
        const respostaBruta = response.data;

        let listaReal: any[] = [];

        if (respostaBruta?.communitiesPost && Array.isArray(respostaBruta.communitiesPost)) {
            listaReal = respostaBruta.communitiesPost;
        } else if (respostaBruta?.data?.communitiesPost && Array.isArray(respostaBruta.data.communitiesPost)) {
            listaReal = respostaBruta.data.communitiesPost;
        } else if (Array.isArray(respostaBruta)) {
            listaReal = respostaBruta;
        }

        if (Array.isArray(listaReal)) {
            const postsDessaComunidade = listaReal.filter((p: any) => p.communityId === communityId);

            return postsDessaComunidade.map((p: any) => ({
                id: p.id,
                content: p.content,
                images: p.images || [],
                communityId: p.communityId,
                createdAt: p.createdAt || new Date().toISOString(),
                author: {
                    id: p.authorId || "anonimo",
                    name: p.authorName || "Usuário da Comunidade",
                    profileImage: p.authorImage || ""
                },

            }));
        }
        
        return [];

    } catch (error) {
        
        return [];
    }
}

export async function criarPostagemAPI(dados: CriarPostagemDTO): Promise<void> {
    
    const payload = {
        authorId: dados.authorId,
        communityId: dados.communityId,
        content: dados.content,
        images: dados.images || []
    };
    
    await api.post('/api/CommunityPost', payload);
}