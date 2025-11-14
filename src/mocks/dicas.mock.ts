export type Dica ={
    id: string;
    title: string;
    image:string;
    author: string;
    contentType: "Video" | "Documento";
    fileUrl?: string;
}

export const mockDicas: Dica[] = [
    {
        id: 'd1',
        title: 'Boas práticas de consumo',
        image: '/dica-agua.png',
        author: 'Jorge Almeida',
        contentType: 'Documento',
        fileUrl: '/boas-praticas-agua.pdf'
    },
    {
        id: 'd2',
        title: 'Como filtrar água de forma caseira',
        image: '/dica-agua2.png',
        author: 'Priscila Silva',
        contentType: 'Video',
        //fileUrl: '/kit-p4.pdf'
    },
];