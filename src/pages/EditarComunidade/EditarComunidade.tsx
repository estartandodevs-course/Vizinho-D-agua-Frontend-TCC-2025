import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { mockComunidades } from "../../mocks/comunidades.mock";
import  BarraTopo from "../../components/BarraTopo/BarraTopo";
import FormularioTexto from "../../components/Formulario/FormularioTexto";
import FormularioTexterea from "../../components/Formulario/FormularioTexterea";
import { IconAnexoColor } from "../../assets/icons";
import Botao from "../../components/Botao/Botao";
import "./EditarComunidade.css";
import Carregando from "../../components/Carregando/Carregando";
type TiposDeDados ={
    title: string;
    description: string;
    coverImage: string;
}
export default function EditarComunidade() {
    const voltar = useNavigate();
    const {id} = useParams();

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

        try{
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const comunidadeExistente = mockComunidades.find((comunidade) => comunidade.id === id);

            if(!comunidadeExistente){
                setError("Comunidade não encontrada.");
                return;
            }
            setDadosComunidade({
                title: comunidadeExistente.title,
                description: comunidadeExistente.description,
                coverImage: comunidadeExistente.coverImage,
            });
            setBannerFile(null);
        }
        catch (err) {
            console.error(err);
            setError("Erro ao carregar a comunidade. Por favor, tente novamente.");
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
        setLoading(true);
        setError("");
        

        try{
            const formData = new FormData();
            formData.append("title", dadosComunidade.title);
            formData.append("description", dadosComunidade.description);
            if(bannerFile) formData.append("coverImage", bannerFile);
        
            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log("Comunidade editada com sucesso:", {
                title: dadosComunidade.title,
                description: dadosComunidade.description,
                coverImage: bannerFile ? bannerFile.name : "Imagem removida",
            });
            voltar("/sucesso-editar-comunidade");
        }
        catch (err) {
            console.error(err);
            setError("Erro ao editar a comunidade. Por favor, tente novamente.");
        }
        finally {
            setLoading(false);
        } 
    }

    const handlerCancelar = () => {
        voltar(-1);
    }

    if(loading) return <Carregando  />;
    if(error) return <p>{error}</p>
    
    return(
        <>
        <BarraTopo title="Editar Comunidade"
        iconType="volta"/>
        <form className="formulario-container" onSubmit={handlerEviar}>
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
                    Editar Comunidade
                </Botao>
            </div>
        </form>
        </>
    )
}
