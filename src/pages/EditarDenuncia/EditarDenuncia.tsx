import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BarraTopo from "../../components/BarraTopo/BarraTopo";
import Formulario from "../../components/Formulario/Formulario";
import { opcoesTipoDenuncia, opcoesEmpresa } from "../../mocks/formulario.mock";
import FormularioTexterea from "../../components/Formulario/FormularioTexterea";
import Botao from "../../components/Botao/Botao";
import FormularioTexto from "../../components/Formulario/FormularioTexto";
import { IconAnexo } from "../../assets/icons";
import './EditarDenuncia.css';
import Carregando from "../../components/Carregando/Carregando";
import { 
    buscarUsuarioAtual, 
    atualizarDenunciaAPI, 
    buscarDenunciaPorId, 
    traduzirLabelParaTipoBackend,
    type CriarDenunciaDTO 
} from "../../services/denuncias.services";


type AnexoMisto = string | File; 

export type DadosDenuncia = {
    reportType: string;
    location: string; 
    description: string;
    company: string;
    anexoAntigo: string[]; 
    anexoNovo: AnexoMisto[]; 

    city: string;
    stateCode: string;
    neighborhood: string; 
    road: string;
};

export default function EditarDenuncia() {
    const voltar = useNavigate();
    const { id } = useParams<{id: string}>(); 

    const [dadosDenuncia, setDadosDenuncia] = useState<DadosDenuncia>({
        reportType: "",
        company: "",
        location: "",
        description: "",
        anexoAntigo: [],
        anexoNovo: [],
        city: "",
        stateCode: "",
        neighborhood: "",
        road: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [reporterId, setReporterId] = useState<string | null>(null);

    
    useEffect(() => {
        async function carregarDadosIniciais() {
            setLoading(true);
            setError("");
            
            if (!id) {
                setError("ID da denúncia ausente.");
                setLoading(false);
                return;
            }

            try {
                const [denuncia, userId] = await Promise.all([
                    buscarDenunciaPorId(id), 
                    buscarUsuarioAtual() 
                ]);
                
                
                const reportTypeLabel = denuncia.reportType; 
                
             
                const initialLocation = denuncia.postalCode || denuncia.neighborhood || "";
                
                const dadosIniciais: DadosDenuncia = {
                    reportType: reportTypeLabel,
                    company: denuncia.waterCompanyRelated || "",
                    location: initialLocation, 
                    description: denuncia.description || "",
                    anexoAntigo: denuncia.attachments || [], 
                    anexoNovo: [],
                    city: denuncia.city || "",
                    stateCode: denuncia.stateCode || "",
                    neighborhood: denuncia.neighborhood || "",
                    road: denuncia.road || "",
                };
                
                setDadosDenuncia(dadosIniciais);
                setReporterId(userId);

            } catch (err) {
                setError("Erro ao carregar a denúncia. Por favor, tente novamente.");
            } finally {
                setLoading(false);
            }
        }
        carregarDadosIniciais();
    }, [id]);


    const handleMudanca = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        
        setDadosDenuncia((dadosAnteriores) => ({
            ...dadosAnteriores,
            [name]: value,
        }));
    };


    const handleArquivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const arquivos = Array.from(e.target.files); 
            setDadosDenuncia((dadosAnteriores) => ({
                ...dadosAnteriores,
                anexoNovo: [...dadosAnteriores.anexoNovo, ...arquivos], 
            }));
        }
    };

    const removerAntigo = (indexRemover: number) => {
        setDadosDenuncia((prev) => ({
            ...prev,
            anexoAntigo: prev.anexoAntigo.filter((_, i) => i !== indexRemover),
        }));
    };

    const removerNovo = (indexRemover: number) => {
        const arquivo = dadosDenuncia.anexoNovo[indexRemover];
        if (arquivo instanceof File) {
            URL.revokeObjectURL(URL.createObjectURL(arquivo));
        }

        setDadosDenuncia((prev) => ({
            ...prev,
            anexoNovo: prev.anexoNovo.filter((_, i) => i !== indexRemover),
        }));
    };


    const handleEnviar = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        if (!id || !reporterId) {
            setError("ID da denúncia ou do usuário ausente.");
            setLoading(false);
            return;
        }
        
        const reportTypeBackendValue = traduzirLabelParaTipoBackend(dadosDenuncia.reportType);

        if (reportTypeBackendValue === null) {
            setError("Tipo de denúncia inválido ou não selecionado.");
            setLoading(false);
            return;
        }

        const cepDigitado = dadosDenuncia.location.replace(/\D/g, '');
        if (cepDigitado.length < 8) {
            setError("Localidade (CEP) é obrigatória e deve ter 8 dígitos.");
            setLoading(false);
            return;
        }

      
        const dadosDenunciaDTO: Partial<CriarDenunciaDTO> = {
            description: dadosDenuncia.description,
            reportType: String(reportTypeBackendValue), 
            waterCompanyRelated: dadosDenuncia.company || undefined,
            postalCode: cepDigitado, 
            
           
          
        };

        

        try {
           
            await atualizarDenunciaAPI(id, dadosDenunciaDTO);
            
            voltar("/sucesso-editar");
        } catch (err: any) {
            setError(err.message || "Erro ao editar a denúncia. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const handlerCancelar = () => {
        voltar(-1);
    };

    if (loading) return <Carregando />;
    if (error && !loading) return <p className="error-message" style={{textAlign: 'center', marginTop: '20px'}}>{error}</p>;

    const anexosParaExibir = [
        ...dadosDenuncia.anexoAntigo,
        ...dadosDenuncia.anexoNovo.filter(anexo => typeof anexo === 'string' || anexo instanceof File).map(anexo => anexo instanceof File ? URL.createObjectURL(anexo) : anexo)
    ];


    return (
        <>
        <BarraTopo title="Denúncia" iconType="volta" />

        <form className="formulario-container" onSubmit={handleEnviar}>
            {error && <p>{error}</p>}

            <Formulario
                label="Tipo de Denúncia:"
                placeholder="Selecione o tipo de denúncia"
                opcoes={opcoesTipoDenuncia as string[]}
                name="reportType"
                value={dadosDenuncia.reportType}
                onChange={handleMudanca}
            />

            <Formulario
                label="Empresa de abastecimento responsável: "
                placeholder="Selecione a empresa responsável"
                opcoes={opcoesEmpresa as string[]}
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
                    
                    {anexosParaExibir.length === 0 && (
                        <div className="placeholder-grande-anexos">
                            <IconAnexo />
                        </div>
                    )}

                    <div className="galeria-mista-container">
                        
                    
                        {dadosDenuncia.anexoAntigo.map((url, index) => (
                            <div key={`antigo-${index}`} className="anexo-item-wrapper">
                                <img src={url} alt={`Anexo Antigo ${index}`} className="preview-thumb" />
                                <button
                                    type="button"
                                    className="botao-remover-anexo"
                                    onClick={() => removerAntigo(index)}
                                >
                                    X
                                </button>
                            </div>
                        ))}

                    
                        {dadosDenuncia.anexoNovo.map((anexo, index) => (
                            <div key={`novo-${index}`} className="anexo-item-wrapper">
                                <img 
                                    src={anexo instanceof File ? URL.createObjectURL(anexo) : String(anexo)} 
                                    alt={`Anexo Novo ${index}`} 
                                    className="preview-thumb" 
                                />
                                <button
                                    type="button"
                                    className="botao-remover-anexo"
                                    onClick={() => removerNovo(index)}
                                >
                                    X
                                </button>
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
                <button type="button" className="botao-cancelar" onClick={handlerCancelar}>
                    Cancelar
                </button>

                <Botao type="submit" variante="primario" >
                    {loading ? "Editando..." : "Editar denúncia"}
                </Botao>
            </div>
        </form>
        </>
    );
}