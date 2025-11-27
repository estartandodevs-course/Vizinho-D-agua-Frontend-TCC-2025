import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { 
    obterComunidadePorId, 
    editarComunidadeAPI, 
    type EditarComunidadeDTO, 
    type ComunidadeAPI 
} from "../../services/comunidade.services"; 

import BarraTopo from "../../components/BarraTopo/BarraTopo";
import FormularioTexto from "../../components/Formulario/FormularioTexto";
import FormularioTexterea from "../../components/Formulario/FormularioTexterea";
import { IconAnexoColor } from "../../assets/icons";
import Botao from "../../components/Botao/Botao";
import "./EditarComunidade.css";
import Carregando from "../../components/Carregando/Carregando";

type TiposDeDados = Pick<ComunidadeAPI, 'title' | 'description' | 'coverImage'>;

export default function EditarComunidade() {
    const voltar = useNavigate();
    const { id } = useParams<{id: string}>(); 

    const [dadosComunidade, setDadosComunidade] = useState<TiposDeDados>({
        title: "",
        description: "",
        coverImage: ""
    });
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() =>{
        async function carregarEditarComunidade(){
            setLoading(true);
            setError("");

            if(!id) {
                setError("ID da comunidade não encontrado na URL.");
                setLoading(false);
                return;
            }

            try{
                const comunidadeExistente = await obterComunidadePorId(id);

                setDadosComunidade({
                    title: comunidadeExistente.title,
                    description: comunidadeExistente.description,
                    coverImage: comunidadeExistente.coverImage,
                });
                setBannerFile(null); 
            }
            catch (err) {
                setError("Erro ao carregar a comunidade. Certifique-se de que o backend está funcionando e o ID é válido.");
            }
            finally {
                setLoading(false);
            }
        }
        carregarEditarComunidade();

    }, [id]);

    const handlerMudanca = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setDadosComunidade((prev) => ({...prev, [name]: value}));
    }
    
    const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;
        
        const previewURL = URL.createObjectURL(file);
        setBannerFile(file);
        setDadosComunidade(prev => ({ ...prev, coverImage: previewURL }));
    }

    const handleRemoverBanner = () => {
        setDadosComunidade(prev => ({ ...prev, coverImage: "" })); 
        setBannerFile(null); 
    }

    const handlerEviar = async (event: React.FormEvent) => {
        event.preventDefault();
        
        if(!id) {
            setError("ID da comunidade ausente.");
            return;
        }

        if(!dadosComunidade.title.trim() || !dadosComunidade.description.trim()){
            setError("Título e descrição são obrigatórios.");
            return;
        }

        setLoading(true);
        setError("");
        
        try{
            const dadosParaAPI: EditarComunidadeDTO = {
                title: dadosComunidade.title,
                description: dadosComunidade.description,
                coverImage: dadosComunidade.coverImage, 
            };
            
            await editarComunidadeAPI(id, dadosParaAPI, bannerFile);
        
            voltar("/sucesso-editar-comunidade");
        }
        catch (err) {
            setError("Erro ao editar a comunidade. Por favor, tente novamente.");
        }
        finally {
            setLoading(false);
        } 
    }

    const handlerCancelar = () => {
        voltar(-1);
    }

    if(loading && !dadosComunidade.title) return <Carregando />;
    if(error && !loading) return <p>{error}</p>
    
    return(
        <>
        <BarraTopo title="Editar Comunidade"
        iconType="volta"/>
        <form className="formulario-container" onSubmit={handlerEviar}>
            {error && <p className="error-message">{error}</p>}
            
            <FormularioTexto
            label="Tipo da comunidade:"
            name="title"
            value={dadosComunidade.title}
            onChange={handlerMudanca}
            />
            <FormularioTexterea
            label="Descrição da comunidade:"
            name="description"
            value={dadosComunidade.description}
            onChange={handlerMudanca}
            />

            <div className="formulario-grupo">
                <label className="formulario-label">Adicionar Foto de Capa: </label>
                <div className="capa-banner-wrapper"> 
                    {dadosComunidade.coverImage ? (
                        <>
                            <img 
                                src={dadosComunidade.coverImage}
                                alt="Capa da comunidade"
                                className="capa-preview-imagem-grande"
                            />
                            
                            <button type="button" className="remover-capa-btn" onClick={handleRemoverBanner}>X</button>
                            
                            <div className="capa-overlay-edicao">
                                <IconAnexoColor />
                            </div>
                        </>
                    ) : (
                        <div className="placeholder-grande">
                            <IconAnexoColor />
                        </div>
                    )}
                    
                    <input 
                        type="file" 
                        onChange={handleImagemChange} 
                        className="input-file-on-top" 
                        accept="image/*" 
                    />
                </div>
            </div>
            
            <div className="formulario-botoes-footer">
                <button type="button"
                className="botao-cancelar"
                onClick={handlerCancelar}>
                    Cancelar
                </button>

                <Botao type="submit" variante="primario" className="botoes-editar">
                    {loading ? "Editando..." : "Editar Comunidade"}
                </Botao>
            </div>
        </form>
        </>
    )
}