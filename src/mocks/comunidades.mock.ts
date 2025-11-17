export type Comunidade = {
    id: string;
    title: string;
    description: string;
    bannerImage?: string;
    coverImage: string;
    membros: number;
    isSeguindo: boolean;
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
    },
    {
        id: "c2",
        title: 'Eventos e Palestras',
        description: 'Comunidade voltada para divulgar eventos, palestras, cursos e oficinas com o objetivo de divulgar e promover maior alcance do conteúdos a quem tem interesse.',
        coverImage: '/comunidade-palestra.png',
        bannerImage: '/banner-palestras.jpg',
        membros: 200,
        isSeguindo: true,
    }
]