export type Alerta ={
    id: string;
    alertType: "Alerta em verificação" | "Alerta verificado";
    title: string;
    location: string;
    time: string;
    expandedText: string;
}

export const mockAlertas: Alerta[] = [
    {
        id: "1",
        alertType: "Alerta em verificação",
        title: "Falta de água desde ontem",
        location: "Rua das Palmeiras",
        time: "há 16h",
        expandedText: "Estou sem água desde ontem, não recebi alertas a respeito da falta de água então estou efetuando essa denúncia para que possam verificar a respeito."
    },
    {
        id: "2",
        alertType: "Alerta verificado",
        title: "Baixa pressão na rede",
        location: "Bairro dos Coqueiros",
        time: "há 19h",
        expandedText: "Moradores da sua região estão relatando baixa pressão na rede de abastecimento. Pode haver redução no fluxo de água em algumas residências."
    }
]