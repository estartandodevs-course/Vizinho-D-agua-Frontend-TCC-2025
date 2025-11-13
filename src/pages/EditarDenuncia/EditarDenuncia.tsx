import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BarraTopo from "../../components/BarraTopo/BarraTopo";
import Formulario from "../../components/Formulario/Formulario";
import { opcoesTipoDenuncia, opcoesEmpresa } from "../../mocks/formulario.mock";
import FormularioTexterea from "../../components/Formulario/FormularioTexterea";
import Botao from "../../components/Botao/Botao";
import { mockDenuncias } from "../../mocks/denuncias.mock";
import FormularioTexto from "../../components/Formulario/FormularioTexto";
import { IconAnexo } from "../../assets/icons";
type DadosDenuncia ={
    reportType: string;
    location: string;
    description: string;
    company: string;
    anexo: string[];
}

export default function EditarDenuncia() {
    const voltar = useNavigate();
    const {id} = useParams();

    const [dadosDenuncia, setDadosDenuncia] = useState<DadosDenuncia>({
        reportType: "",
        company: "",
        location: "",
        description: "",
        anexo: [],
    });

    useEffect(() =>{
        const denunciaParaEditar = mockDenuncias.find((denuncia) => denuncia.id === id);
        
        if(denunciaParaEditar){
            setDadosDenuncia({
                reportType: denunciaParaEditar.title,
                company: denunciaParaEditar.company || "",
                location: denunciaParaEditar.location,
                description: denunciaParaEditar.description || "",
                anexo: denunciaParaEditar.anexos || [],
            });
        }
    }, [id]);
    
    const handleMudanca = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setDadosDenuncia((dadosAnteriores) => ({
            ...dadosAnteriores,
            [name]: value,
        }));
    }

    const handleEnviar = (event: React.FormEvent) => {
        event.preventDefault();
        voltar("/sucesso-editar");
    }

    return(
        <>
        <BarraTopo title="Editar Denúncia" iconType="volta" />

        <form className="formulario-container" onSubmit={handleEnviar}>
            <Formulario
                label="Tipo de Denúncia:"
                placeholder="Selecione o tipo de denúncia"
                opcoes={opcoesTipoDenuncia}
                name="reportType"
                value={dadosDenuncia.reportType}
                onChange={handleMudanca}
            />

            <Formulario
                label="Empresa de abastecimento responsável: "
                placeholder="Selecione a empresa responsável"
                opcoes={opcoesEmpresa}
                name="company"
                value={dadosDenuncia.company}
                onChange={handleMudanca}
            />
            <FormularioTexto 
                label="Localidade afetada (CEP):"
                placeholder="Informe o cep da localidade afetada"
                name="location"
                value={dadosDenuncia.location}
                onChange={handleMudanca}
            />
            <FormularioTexterea
                label="Descrição da denúncia:"
                placeholder="Descreva a sua denúncia"
                name="description"
                value={dadosDenuncia.description}
                onChange={handleMudanca}
            />

            <div className="formulario-grupo">
                <label className="formulario-label">Anexos: </label>

                {dadosDenuncia.anexo.length > 0 ? (
                    <div className="anexo-galeria">
                        {dadosDenuncia.anexo.map((anexoUrl, index) => (
                            <img 
                            key={index} 
                            src={`/${anexoUrl}`} 
                            alt={`Anexo ${index + 1}`} 
                            className="anexo-imagem-item"/>
                        ))}
                    </div>
                ) : (
                    <div className="anexo-placeholder">
                        <IconAnexo />
                    </div>
                )}
            </div>
            

            <Botao type="submit" variante="primario">
            Editar denúncia</Botao>
        </form>
        </>

    )
}