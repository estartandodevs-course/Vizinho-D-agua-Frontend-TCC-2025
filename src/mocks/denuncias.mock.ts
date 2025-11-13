export type Denuncia = {
    id: string;
    title: string;
    location: string;
    date: string;
    company?: string;
    description?: string;
    status: 'Em Andamento' | 'Processada';
    linkType: 'Editar' | 'Ver Detalhes';
    anexos?: string[];
}

export const mockDenuncias: Denuncia[] = [
    {
        id: 'd1',
        title: 'Falta de água',
        location: 'Rua das Palmeiras',
        date: '21/10/2025',
        company: 'Cedae',
        description: 'A água não está chegando nas torneiras desde ontem.',
        status: 'Em Andamento',
        linkType: 'Editar',
        anexos: ['lavando-a-mao.png', 'torneira-sem-agua.png']
    },
    {
        id: 'd2',
        title: 'Baixa Pressão',
        location: 'Bairro dos Coqueiros',
        date: '01/10/2025',
        company: 'Águas do Rio',
        description: 'A pressão da água está muito baixa, dificultando o uso diário.',
        status: 'Processada',
        linkType: 'Ver Detalhes',
        anexos: ['torneira-sem-agua2.png']
    }
]