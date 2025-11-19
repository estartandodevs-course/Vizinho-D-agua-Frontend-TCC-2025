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
import './EditarDenuncia.css'

type DadosDenuncia ={
    reportType: string;
    location: string;
    description: string;
    company: string;
    anexoAntigo: string[];
    anexoNovo: string[];
}

export default function EditarDenuncia() {
    const voltar = useNavigate();
    const {id} = useParams();

    const [dadosDenuncia, setDadosDenuncia] = useState<DadosDenuncia>({
        reportType: "",
        company: "",
        location: "",
        description: "",
        anexoAntigo: [],
        anexoNovo: [],
    });
    

    useEffect(() =>{
        const denunciaParaEditar = mockDenuncias.find((denuncia) => denuncia.id === id);
        
        if(denunciaParaEditar){
            setDadosDenuncia({
                reportType: denunciaParaEditar.reportType,
                company: denunciaParaEditar.company || "",
                location: denunciaParaEditar.location,
                description: denunciaParaEditar.description || "",
                anexoAntigo: denunciaParaEditar.attachments || [],
                anexoNovo: [],
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

    const handleArquivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            const arquivos = Array.from(e.target.files);
            const novosPreviews = arquivos.map(file => URL.createObjectURL(file));
            setDadosDenuncia((dadosAnteriores) => ({
                ...dadosAnteriores,
                anexoNovo: [...dadosAnteriores.anexoNovo, ...novosPreviews],
            }));
        
        }

    }
    const removerAntigo = (indexRemover: number) => {
        setDadosDenuncia(prev => ({
            ...prev,
            anexoAntigo: prev.anexoAntigo.filter((_, i) => i !== indexRemover)
        }));
    }
    const removerNovo = (indexRemover: number) => {
        setDadosDenuncia(prev => ({
            ...prev,
            anexoNovo: prev.anexoNovo.filter((_, i) => i !== indexRemover)
        }));
    }

    const handleEnviar = (event: React.FormEvent) => {
        event.preventDefault();
        voltar("/sucesso-editar");
    }
    const handlerCancelar = () => {
        voltar(-1);
    }

    return(
        <>
        <BarraTopo title="Denúncia" iconType="volta" />

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

                <div className="anexo-container-com-borda">
                    {dadosDenuncia.anexoAntigo.length === 0 && dadosDenuncia.anexoNovo.length === 0 && (
                        <div className="placeholder-grande-anexos">
                            <IconAnexo />
                        </div>
                    )}
                    <div className="galeria-mista-container">
                        
                        {dadosDenuncia.anexoAntigo.map((anexo, index) => (
                            <div key={`antigo-${index}`} className="anexo-item-wrapper">
                                <img src={`/${anexo}`} alt={`Antigo ${index}`} className="preview-thumb" />
                                <button type="button" className="botao-remover-anexo" onClick={() => removerAntigo(index)}>X</button>
                            </div>
                        ))}

                        {dadosDenuncia.anexoNovo.map((anexo, index) => (
                            <div key={`novo-${index}`} className="anexo-item-wrapper">
                                <img src={anexo} alt={`Novo ${index}`} className="preview-thumb" />
                                <button type="button" className="botao-remover-anexo" onClick={() => removerNovo(index)}>X</button>
                            </div>
                        ))}

                        <div className="anexo-botao-upload">
                            <input
                                type="file"
                                multiple
                                className="input-file-hidden"
                                onChange={handleArquivoChange}
                            />
                        </div>
                    </div>
                
                </div>
            </div>
            
            <div className="formulario-botoes-footer">
            <button type="button"
            className="botao-cancelar"
            onClick={handlerCancelar}>
                Cancelar
            </button>

            <Botao type="submit" variante="primario">
            Editar denúncia</Botao>
            </div>
        </form>
        </>

    )
}