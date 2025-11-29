import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import BarraTopo from "../../components/BarraTopo/BarraTopo";
import Formulario from "../../components/Formulario/Formulario";
import FormularioTexterea from "../../components/Formulario/FormularioTexterea";
import { IconAnexo } from "../../assets/icons";
import Botao from "../../components/Botao/Botao";
import "./CriarDenuncia.css"
import { opcoesTipoDenuncia, opcoesEmpresa } from "../../mocks/formulario.mock"; 
import FormularioTexto from "../../components/Formulario/FormularioTexto";

import { 
    criarDenunciaAPI, 
    buscarUsuarioAtual, 
    traduzirLabelParaTipoBackend 
} from '../../services/denuncias.services'; 

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
    
    const [reporterId, setReporterId] = useState<string | null>(null);
    const [anexosPreview, setAnexosPreview] = useState<string[]>([]);
    const [anexosFiles, setAnexosFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    
    useEffect(() => {
        async function loadUser() {
            try {
                const id = await buscarUsuarioAtual();
                setReporterId(id);
                setError("");
            } catch (err) {
                setError("Falha ao carregar as informações do usuário.");
            }
        }
        loadUser();
    }, []);

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
        URL.revokeObjectURL(anexosPreview[indexRemover]);
        
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

        if (!reporterId) {
            setError("ID do usuário ausente. O envio não foi autorizado.");
            setLoading(false);
            return;
        }
        

        const reportTypeBackendValue = traduzirLabelParaTipoBackend(dadosDenuncia.reportType);
        
        if (reportTypeBackendValue === null) {
            setError("Tipo de denúncia inválido. Selecione uma opção válida da lista.");
            setLoading(false);
            return;
        }


        const formData = new FormData();
        

        formData.append("description", dadosDenuncia.description);
        formData.append("waterCompanyRelated", dadosDenuncia.company);
        formData.append("reportType", String(reportTypeBackendValue)); 
        formData.append("reporterId", reporterId); 
        formData.append("postalCode", dadosDenuncia.location); 
        
        anexosFiles.forEach((file) => {
             formData.append(`files`, file); 
        });

        try{
            await criarDenunciaAPI(formData); 
            
            voltar("/sucesso-denuncia");
        }
        catch(err: any){
            setError(err.message || "Erro ao enviar a denúncia. Tente novamente."); 
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
                opcoes={opcoesTipoDenuncia as string[]} 
                name="reportType"
                value={dadosDenuncia.reportType}
                onChange={handleMudanca}
            />
            <Formulario 
                label="Empresa de abastecimento responsável:"
                placeholder="Selecione a empresa responsável"
                opcoes={opcoesEmpresa as string[]} 
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
            {error && <p className="error-message">{error}</p>} 
            <Botao type="submit">
                {loading ? "Enviando..." : "Registrar denúncia"}
            </Botao>

        </form>
        </>
    )
}