import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { mockComunidades } from "../../mocks/comunidades.mock";
import  BarraTopo from "../../components/BarraTopo/BarraTopo";
import FormularioTexto from "../../components/Formulario/FormularioTexto";
import FormularioTexterea from "../../components/Formulario/FormularioTexterea";
import { IconAnexoColor } from "../../assets/icons";
import Botao from "../../components/Botao/Botao";
import "./EditarComunidade.css";
type TiposDeDados ={
    title: string;
    description: string;
    bannerImage?: string;
}
export default function EditarComunidade() {
    const voltar = useNavigate();
    const {id} = useParams();

    const [dadosComunidade, setDadosComunidade] = useState<TiposDeDados>({
        title: "",
        description: "",
        bannerImage: ""
    });
    const [bannerFile, setBannerFile] = useState<File | null>(null);

    useEffect(() =>{
        const comunidade = mockComunidades.find((comunidade) => comunidade.id === id);
        if(comunidade) {
            setDadosComunidade({
                title: comunidade.title,
                description: comunidade.description,
                bannerImage: comunidade.bannerImage ? `${comunidade.bannerImage}` : ""
            });
            setBannerFile(null);
        }
    }, [id]);

    const handlerMudanca = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setDadosComunidade((prev) => ({...prev, [name]: value}));
    }
    const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const previewUrl = file ? URL.createObjectURL(file) : "";
        setDadosComunidade((prev) => ({...prev, bannerImage: previewUrl}));
    }

    const handleRemoverBanner = () => {
        setDadosComunidade(prev => ({ ...prev, bannerImage: "" })); 
        setBannerFile(null); 
    }

    const handlerEviar = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Comunidade editada:", dadosComunidade);
        console.log("Novo Banner: ", bannerFile);
        voltar("/sucesso-editar-comunidade");
    }

    const handlerCancelar = () => {
        voltar(-1);
    }

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
                    {dadosComunidade.bannerImage ? (
                        <>
                           
                            <img 
                                src={dadosComunidade.bannerImage}
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
