import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// 💡 REINTRODUZIDO: Importa mock e o tipo do mock
import { mockComunidades, type Comunidade as ComunidadeMockType } from "../../mocks/comunidades.mock"; 

import BarraTopo from "../../components/BarraTopo/BarraTopo";
import FormularioTexto from "../../components/Formulario/FormularioTexto";
import FormularioTexterea from "../../components/Formulario/FormularioTexterea";
import { IconAnexoColor } from "../../assets/icons";
import Botao from "../../components/Botao/Botao";
import "./EditarComunidade.css";
import Carregando from "../../components/Carregando/Carregando";

import { getComunidades, saveComunidades, type Comunidade } from "../../utils/localStorage"; 

type TiposDeDados ={
    title: string;
    description: string;
    coverImage: string; 
}


type ComunidadeLocal = Comunidade; 

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

export default function EditarComunidade() {
    const voltar = useNavigate();
    const {id} = useParams(); 

    const [comunidadeOriginalId, setComunidadeOriginalId] = useState<string | number | null>(null);

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

            const idNumerico = Number(id);
            
            const todasComunidadesLocais = getComunidades();
            const comunidadeLocal = todasComunidadesLocais.find((c) => c.id === idNumerico);

            let comunidadeExistente: ComunidadeLocal | ComunidadeMockType | null = null;

            if (comunidadeLocal) {
                comunidadeExistente = comunidadeLocal;
                setComunidadeOriginalId(comunidadeLocal.id); 
            } else {
                const comunidadeMock = mockComunidades.find((c) => c.id === id);
                
                if (comunidadeMock) {
                    comunidadeExistente = comunidadeMock;
                    setComunidadeOriginalId(comunidadeMock.id); 
                }
            }


            if(!comunidadeExistente){
                setError("Comunidade não encontrada.");
                return;
            }
            
            setDadosComunidade({
                title: comunidadeExistente.title,
                description: comunidadeExistente.description,
               
                coverImage: comunidadeExistente.coverImage || "", 
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
        
        if (dadosComunidade.coverImage && dadosComunidade.coverImage.startsWith('blob:')) {
            URL.revokeObjectURL(dadosComunidade.coverImage);
        }

        const previewURL = URL.createObjectURL(file);
        setBannerFile(file);
        setDadosComunidade(prev => ({ ...prev, coverImage: previewURL }));
    }

    const handleRemoverBanner = () => {
        if (dadosComunidade.coverImage && dadosComunidade.coverImage.startsWith('blob:')) {
            URL.revokeObjectURL(dadosComunidade.coverImage);
        }
        setDadosComunidade(prev => ({ ...prev, coverImage: "" })); 
        setBannerFile(null); 
    }



    const handlerEviar = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        
        if (!comunidadeOriginalId) {
             setError("ID da comunidade não encontrado para salvar.");
             setLoading(false);
             return;
        }

        try{
            let novaCoverImage: string | null = dadosComunidade.coverImage;

            if(bannerFile) {
                novaCoverImage = await fileToBase64(bannerFile);
            } else if (dadosComunidade.coverImage === "") {
                novaCoverImage = null;
            } 


            const todasComunidades = getComunidades();
            
            const indice = todasComunidades.findIndex(c => String(c.id) === String(comunidadeOriginalId));
            
            const comunidadeBase = indice !== -1 
                ? todasComunidades[indice] 
                : mockComunidades.find(c => c.id === comunidadeOriginalId) as ComunidadeMockType;


            if (!comunidadeBase) {
                 setError("Comunidade base não encontrada para edição.");
                 throw new Error("Comunidade base não encontrada");
            }
            
          
            const comunidadeAtualizada: Comunidade = {
               
    
                id: Number(comunidadeBase.id), 
                title: dadosComunidade.title,
                description: dadosComunidade.description,
                coverImage: novaCoverImage, 
             
                members: comunidadeBase.members,
                isSeguindo: true, 
                isOwner: true, 
            };


            if (indice !== -1) {
                todasComunidades[indice] = comunidadeAtualizada;
            } else {
                todasComunidades.push(comunidadeAtualizada);
            }
            saveComunidades(todasComunidades);


            if (dadosComunidade.coverImage && dadosComunidade.coverImage.startsWith('blob:')) {
                 URL.revokeObjectURL(dadosComunidade.coverImage);
            }
            
            await new Promise((resolve) => setTimeout(resolve, 500));
            
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
        if (dadosComunidade.coverImage && dadosComunidade.coverImage.startsWith('blob:')) {
            URL.revokeObjectURL(dadosComunidade.coverImage);
        }
        voltar(-1);
    }

    if(loading) return <Carregando />;
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
                    {loading ? "Salvando..." : "Editar Comunidade"}
                </Botao>
            </div>
        </form>
        </>
    )
}