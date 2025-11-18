export type Comunidade = {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    
    bannerImage?: string;
    membros: number;
    isSeguindo: boolean;
    isOwner: boolean;
}

export const mockComunidades: Comunidade[] = [
    {
        id: "c1",
        title: "Guia de sobrevivência sem água", 
        description: "Comunidade voltada para compartilhar dicas práticas de como lidar com a falta de água no dia a dia.",
        coverImage: '/comunidade-agua.png',
        bannerImage: '/banner-agua.jpg',
        membros: 500,
        isSeguindo: false,
        isOwner: false,
    },
    {
        id: "c2",
        title: 'Eventos e Palestras',
        description: 'Comunidade voltada para divulgar eventos, palestras, cursos e oficinas com o objetivo de divulgar e promover maior alcance do conteúdos a quem tem interesse.',
        coverImage: '/comunidade-palestra.png',
        bannerImage: '/banner-palestras.jpg',
        membros: 200,
        isSeguindo: true,
        isOwner: false,
    },
    {
        id: "c3",
        title: 'Práticas para comunidades',
        description: 'Comunidade voltada para divulgar práticas comunitárias aplicadas em comunidades. O objetivo é apresentar as práticas e seus resultados para caso queiram replicam em suas comunidades.',
        coverImage: '/card-praticas.jpg',
        bannerImage: '/banner-praticas.jpg',
        membros: 57,
        isSeguindo: true,
        isOwner: true,
    }
]