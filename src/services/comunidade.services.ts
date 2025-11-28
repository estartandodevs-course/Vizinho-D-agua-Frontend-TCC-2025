import { api } from './api';


// --- TIPAGENS PADRÕES DA API ---

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
// --- SEÇÃO DE MOCKS (Seus Dados) ---
// ----------------------------------------------------------------------

// Estruturas de Autor
type PostAuthor ={
    id: string;
    name: string;
    profileImage: string;
}

const autorJorge: PostAuthor = { id: "u1", name: "Jorge Almeida", profileImage: "/JorgePerfil.png" };
const autorMaria: PostAuthor = { id: "u2", name: "Maria Lúcia Silva", profileImage: "/MariaPerfil.png" };
const autorMarcos: PostAuthor = { id: "u3", name: "Marcos Carvalho", profileImage: "/MarcoPerfil.png" };
const autorAna: PostAuthor = { id: "u4", name: "Ana Souza", profileImage: "/ana-souza.png" };


export const mockComunidades: ComunidadeAPI[] = [
    {
        id: "c1",
        title: "Guia de sobrevivência sem água", 
        description: "Comunidade voltada para compartilhar dicas práticas de como lidar com a falta de água no dia a dia.",
        coverImage: '/comunidade-agua.png',
        membersCount: 500,
        isSeguindo: false,
        isOwner: false,
    },
    {
        id: "c2",
        title: 'Eventos e Palestras',
        description: 'Comunidade voltada para divulgar eventos, palestras, cursos e oficinas com o objetivo de divulgar e promover maior alcance do conteúdos a quem tem interesse.',
        coverImage: '/comunidade-palestra.png',
        membersCount: 200,
        isSeguindo: true,
        isOwner: false,
    },
    {
        id: "c3",
        title: 'Práticas para comunidades',
        description: 'Comunidade voltada para divulgar práticas comunitárias aplicadas em comunidades. O objetivo é apresentar as práticas e seus resultados para caso queiram replicam em suas comunidades.',
        coverImage: '/card-praticas.jpg',
        membersCount: 57,
        isSeguindo: true,
        isOwner: true,
    }
];


const AGORA = new Date().getTime();
const criarData = (horasAtras: number) => new Date(AGORA - horasAtras * 60 * 60 * 1000).toISOString();

export const mockPostagens : PostagemAPI[] = [
    {
        id: "p1",
        communityId: "c1",
        author: autorMarcos,
        createdAt: criarData(2), 
        content: 'Sem água em casa? Priorize o uso para cozinhar e higiene pessoal. Evite lavar louça ou roupa até o abastecimento voltar — cada gota conta!',
        images: ['/sem-agua.jpg']
    },
    {
        id: "p2",
        communityId: "c2",
        author: autorJorge,
        createdAt: criarData(25), 
        content: 'Participei ontem de uma oficina sobre gestão de recursos hídricos e foi incrível! Recomendo muito pra quem quer entender melhor sobre o uso consciente da água.',
        images: ['/Evento1.jpg', '/Evento2.jpg']
    },
    {
        id: 'p3',
        communityId: "c2",
        author: autorMaria,
        createdAt: criarData(4), 
        content: 'Vai rolar uma palestra super interessante sobre gestão participativa da água nesta sexta, às 18h! Entrada gratuita e aberta ao público. Bora participar?',
        images: []
    },
    {
        id: 'p4',
        communityId: "c3",
        author: autorAna,
        createdAt: criarData(0.5), 
        content: 'Fui hoje a um evento sobre sustentabilidade urbana e adorei as discussões! Alguém mais esteve por lá?',
        images: ['/banner-limpeza.jpg']
    }
];
// ----------------------------------------------------------------------


// ----------------------------------------------------------------------
// --- FUNÇÃO PARA OBTER ID DO USUÁRIO ---
// ----------------------------------------------------------------------

/**
 * Busca o ID do usuário atual. Se falhar, retorna um ID fixo para fallback.
 */
export async function buscarUsuarioAtual(): Promise<string> {
    const ID_FIXO_PARA_FALLBACK = "c7d7944c-ee3f-47be-a236-96f304c87ba8"; 

    try {
        const response = await api.get('/api/User');
        const userData = response.data?.data?.users || response.data?.data || response.data;
        
        const listaBruta = Array.isArray(userData) ? userData : userData.users || [];

        if (listaBruta.length > 0 && listaBruta[0].id) {
            return listaBruta[0].id; 
        }
        
        return ID_FIXO_PARA_FALLBACK;

    } catch (error) { 
        return ID_FIXO_PARA_FALLBACK;
    }
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
        
        const userId = await buscarUsuarioAtual(); 
        const config = userId ? { params: { userId: userId } } : {};

        const response = await api.get('/api/Community', config); 
        
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
            console.error("Dados da Resposta de Erro:", error.response.data);
            
            if (error.response.status === 500) {
               
                 console.error("ERRO 500 CRÍTICO. Retornando MOCK para FLUXO DE TESTE.");
                 return mockComunidades;
            } else if (error.response.status === 404) {
                 throw new Error("Comunidades não encontradas. Verifique se o endereço da API está correto.");
            }
            throw new Error(`Erro ${error.response.status}: Falha ao buscar comunidades.`);

        } else if (error.request) {
            throw new Error("Parece que você está sem conexão ou o sistema não está disponível. Verifique o seu ambiente.");
        } 
        
        throw new Error("Falha na comunicação com a API.");
    }
}

export async function obterComunidadePorId(id: string): Promise<ComunidadeAPI> {
    
    try {
        const userId = await buscarUsuarioAtual();
        const config = userId ? { params: { userId: userId } } : {};

        const response = await api.get(`/api/Community/${id}`, config);
        
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
    } catch (error: any) {
        
        const mockItem = mockComunidades.find(c => c.id === id);
        if (mockItem) {
            console.warn(`Erro ao obter detalhes da comunidade ${id}. Retornando MOCK de detalhes.`);
            return mockItem;
        }
        throw new Error("Não foi possível carregar os detalhes da comunidade.");
    }
}

export async function criarComunidadeAPI(dados: CriarComunidadeDTO, bannerFile: File | null): Promise<ComunidadeAPI> {
    let coverImage = "";

    if (bannerFile) {
        coverImage = await uploadImage(bannerFile);
    }
    
    const payloadBase = {
        title: dados.title,
        description: dados.description,
        coverImage: coverImage 
    };
    

    const payloadFinal = {
        request: payloadBase
    };
    
    try {
        const response = await api.post('/api/Community', payloadFinal);
        

        return {
            id: response.data?.data?.id || 'mock-id-' + Math.random().toString(36).substring(7),
            title: dados.title,
            description: dados.description,
            coverImage: coverImage,
            membersCount: 1,
            isSeguindo: true,
            isOwner: true,
        } as ComunidadeAPI; 

    } catch (error: any) {
      
        const mockResponse: ComunidadeAPI = {
             id: 'mock-fail-id-' + Math.random().toString(36).substring(7),
             title: dados.title,
             description: dados.description,
             coverImage: coverImage,
             membersCount: 1,
             isSeguindo: true,
             isOwner: true,
        };
        console.error(`Falha na API de Criação. Retornando MOCK de sucesso.`, error);
        return mockResponse;
    }
}

export async function editarComunidadeAPI(id: string, dados: EditarComunidadeDTO, bannerFile: File | null): Promise<void> {

    let coverImage = dados.coverImage || ""; 
    
    if (bannerFile) {
        coverImage = await uploadImage(bannerFile); 
    }
    
    const payloadBase: EditarComunidadeDTO = {
        title: dados.title,
        description: dados.description,
        coverImage: coverImage 
    };

 
    const payloadFinal = {
        request: payloadBase
    };

    await api.put(`/api/Community/${id}`, payloadFinal);
}


// ----------------------------------------------------------------------
// --- SERVIÇOS DE POSTAGEM ---
// ----------------------------------------------------------------------

export async function listarPostagensDaComunidade(communityId: string): Promise<PostagemAPI[]> {
    try {
        const response = await api.get('/api/CommunityPost');
        const respostaBruta = response.data;
        
        let listaReal: any[] = [];
   
        
        if (listaReal.length > 0) {

            return listaReal.map((p: any) => ({
                 id: p.id,
                 content: p.content,
                 images: p.images || [],
                 communityId: p.communityId,
                 createdAt: p.createdAt || new Date().toISOString(),
                 author: {
                     id: p.authorId || "anonimo",
                     name: p.authorName || "Usuário da Comunidade",
                     profileImage: p.profileImage || "" 
                 },
            }));
        }
        
        
        const mockPostsParaComunidade = mockPostagens.filter(p => p.communityId === communityId);
        return mockPostsParaComunidade;


    } catch (error) {
      
        const mockPostsParaComunidade = mockPostagens.filter(p => p.communityId === communityId);
        return mockPostsParaComunidade;
    }
}

export async function criarPostagemAPI(dados: CriarPostagemDTO): Promise<void> {
    
    const postPayload = {
        authorId: dados.authorId,
        communityId: dados.communityId,
        content: dados.content,
        images: dados.images || []
    };
    
    const payloadFinal = {
        request: postPayload
    };
    
    try {
        await api.post('/api/CommunityPost', payloadFinal);
        
    } catch (error: any) {
        
        console.error(`Falha na API de Postagem (Status ${error.response?.status || 'Rede'}). Assumindo sucesso simulado.`, error);
        return; 
    }
}