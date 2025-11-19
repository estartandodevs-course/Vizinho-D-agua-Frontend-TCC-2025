export type Denuncia = {
    id: string;
    reportType: string;
    description?: string;
    status: 'Em Andamento' | 'Processada';
    location: string;

    createdAt: string; // CreatedAt
    company?: string;
    linkType: 'Editar' | 'Ver Detalhes';
    attachments?: string[]; // attachments
}

export const mockDenuncias: Denuncia[] = [
    {
        id: 'd1',
        reportType: 'Falta de água',
        location: 'Rua das Palmeiras',
        createdAt: '21/10/2025',
        company: 'Cedae',
        description: 'A água não está chegando nas torneiras desde ontem.',
        status: 'Em Andamento',
        linkType: 'Editar',
        attachments: ['lavando-a-mao.png', 'torneira-sem-agua.png'],
        
    },
    {
        id: 'd2',
        reportType: 'Baixa Pressão',
        location: 'Bairro dos Coqueiros',
        createdAt: '01/10/2025',
        company: 'Cedae',
        description: 'Estou sem água desde nove horas da manhã do dia 01/10/2025.',
        status: 'Processada',
        linkType: 'Ver Detalhes',
        attachments: ['torneira-sem-agua2.png']
    }
]