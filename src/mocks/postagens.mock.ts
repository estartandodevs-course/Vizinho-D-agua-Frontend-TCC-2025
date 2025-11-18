type PostAuthor ={
    id: string;
    name: string;
    profileImage: string;
}

const autorJorge: PostAuthor = {
    id: "u1",
    name: "Jorge Almeida",
    profileImage: "/JorgePerfil.png",
}

const autorMaria: PostAuthor = {
    id: "u2",
    name: "Maria Lúcia Silva",
    profileImage: "/MariaPerfil.png",
}
 
const autorMarcos: PostAuthor = {
    id: "u3",
    name: "Marcos Carvalho",
    profileImage: "/MarcoPerfil.png",
}
const autorAna: PostAuthor = {
    id: "u4",
    name: "Ana Souza",
    profileImage: "/ana-souza.png",
}

export type CommunityPost = {
    id: string;
    communityId: 'c1' | 'c2' | 'c3';
    content: string;
    images?: string[];
    
    author: PostAuthor;
    date: string;
}

export const mockPostagens : CommunityPost[] = [
    {
        id: "p1",
        communityId: "c1",
        author: autorMarcos,
        date: '21/10/25',
        content: 'Sem água em casa? Priorize o uso para cozinhar e higiene pessoal. Evite lavar louça ou roupa até o abastecimento voltar — cada gota conta!',
        images: ['/sem-agua.jpg']
    },
    {
        id: "p2",
        communityId: "c2",
        author: autorJorge,
        date: '21/10/25',
        content: 'Participei ontem de uma oficina sobre gestão de recursos hídricos e foi incrível! Recomendo muito pra quem quer entender melhor sobre o uso consciente da água.',
        images: ['/Evento1.jpg', '/Evento2.jpg']
    },
    {
        id: 'p3',
        communityId: "c2",
        author: autorMaria,
        date: '20/10/25',
        content: 'Vai rolar uma palestra super interessante sobre gestão participativa da água nesta sexta, às 18h! Entrada gratuita e aberta ao público. Bora participar?',
    },
    {
        id: 'p4',
        communityId: "c3",
        author: autorAna,
        date: '21/10/25',
        content: 'Fui hoje a um evento sobre sustentabilidade urbana e adorei as discussões! Alguém mais esteve por lá?',
        images: ['/banner-limpeza.jpg']
    }
   

]