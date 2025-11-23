import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BarraTopo from "../../components/BarraTopo/BarraTopo";
import Formulario from "../../components/Formulario/Formulario";
import FormularioTexterea from "../../components/Formulario/FormularioTexterea";
import { IconAnexo } from "../../assets/icons";
import Botao from "../../components/Botao/Botao";
import "./CriarDenuncia.css"
import { opcoesTipoDenuncia, opcoesEmpresa } from "../../mocks/formulario.mock";
import FormularioTexto from "../../components/Formulario/FormularioTexto";


type DadosDenuncia = { 
    reportType: string;
    location: string;
    description: string;
    company: string;
   
}

export default function CriarDenuncia() {
    const voltar = useNavigate();

    const [dadosDenuncia, setDadosDenuncia] = useState<DadosDenuncia>({
        reportType: "",
        company: "",
        location: "",
        description: "",

    });
    const [anexosPreview, setAnexosPreview] = useState<string[]>([]);
    const [anexosFiles, setAnexosFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleMudanca = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setDadosDenuncia((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleArquivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return;
        
        const arquivos = Array.from(e.target.files);

        const novosPreviews = arquivos.map(arquivo => URL.createObjectURL(arquivo));
        setAnexosPreview(prev => [...prev, ...novosPreviews]);
        setAnexosFiles(prev => [...prev, ...arquivos]);
    }

    const handleRemoverAnexo = (indexRemover: number) => {
        setAnexosPreview(prev => prev.filter((_, index) => index !== indexRemover));
        setAnexosFiles(prev => prev.filter((_, index) => index !== indexRemover));
    }

    const handlerEnviar = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        if(!dadosDenuncia.reportType || !dadosDenuncia.company || !dadosDenuncia.location || !dadosDenuncia.description){
            setError("Por favor, preencha todos os campos obrigatórios.");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("reportType", dadosDenuncia.reportType);
        formData.append("company", dadosDenuncia.company);
        formData.append("location", dadosDenuncia.location);
        formData.append("description", dadosDenuncia.description);
        anexosFiles.forEach((file) => {
            formData.append("files", file);
        });

        try{
            await new Promise((resolve) => setTimeout(resolve, 3000));
            voltar("/sucesso-denuncia");
        }
        catch(err){
            console.error(err);
            setError("Erro ao enviar a denúncia. Tente novamente.");
        }
        finally {
            setLoading(false);
        }

    }

    return(
        <>
        <BarraTopo title="Criar Denúncia" iconType="volta" />
        <form className="formulario-container" onSubmit={handlerEnviar}>
            <Formulario
                label="Tipo de Denúncia:"
                placeholder="Selecione o tipo de denúncia"
                opcoes={opcoesTipoDenuncia}
                name="reportType"
                value={dadosDenuncia.reportType}
                onChange={handleMudanca}
            />
            <Formulario 
                label="Empresa de abastecimento responsável:"
                placeholder="Selecione a empresa responsável"
                opcoes={opcoesEmpresa}
                name="company"
                value={dadosDenuncia.company}
                onChange={handleMudanca}
            />
            <FormularioTexto 
                label="Localidade afetada (CEP):"
                placeholder="Informe o CEP da localidade afetada"
                name="location"
                value={dadosDenuncia.location}
                onChange={handleMudanca}
            />
            <FormularioTexterea 
                label="Descrição:"
                placeholder="Descreva o incidente "
                name="description"
                value={dadosDenuncia.description}
                onChange={handleMudanca}
            />
            
           <div className="formulario-grupo">
                <label className="formulario-label">Anexos:</label>
                
                <div className="anexo-container-grande">
                    
                    <div className="galeria-mista-container">
                        
              
                        {anexosPreview.map((preview, index) => (
                            <div key={index} className="anexo-item-denuncia">
                                <img src={`${preview}`} alt={`Anexo ${index + 1}`} className="preview-thumb" />  
                                <button 
                                type="button" 
                                className="botao-remover-anexo" 
                                onClick={() => handleRemoverAnexo(index)}>X</button>
                            </div>
                        ))}

                        <div className="anexo-botao-upload">
                            <IconAnexo />
                            <input
                                type="file"
                                multiple
                                className="input-file-hidden"
                                onChange={handleArquivoChange}
                            />
                        </div>
                    </div>

                    {anexosPreview.length === 0 && (
                         <div className="placeholder-grande-anexos">
                            <IconAnexo />

                         </div>
                    )}

                </div>
            </div>
            {error && <p >{error}</p>}
            <Botao type="submit">{loading ? "Enviando..." : "Registrar denúncia"}</Botao>

        </form>
        </>
    )
}