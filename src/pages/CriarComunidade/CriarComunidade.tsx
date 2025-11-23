import { IconAnexo } from "../../assets/icons";
import BarraTopo from "../../components/BarraTopo/BarraTopo";
import FormularioTexto from "../../components/Formulario/FormularioTexto";
import FormularioTexterea from "../../components/Formulario/FormularioTexterea";
import Botao from "../../components/Botao/Botao";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CriarComunidade.css"
type DadosComunidade ={
    title: string;
    description: string;
}


export default function CriarComunidade() {
    const voltar = useNavigate();

    const [dados, setDados] = useState<DadosComunidade>({
        title: "",
        description: ""
    });

    const [bannerImage, setBannerImage] = useState<string>("");
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleMudanca = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
       setDados((prev) => ({...prev, [name]: value}));
    }
    const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]){
            const arquivo = e.target.files?.[0];

            if(!arquivo.type.startsWith("image/")){
                setError("Por favor, selecione um arquivo de imagem válido.");
                return;
            }

            setError("");

            const previewUrl = URL.createObjectURL(arquivo);
            setBannerImage(previewUrl);
            setBannerFile(arquivo);
        }
    }
    const handleRemoverBanner = () => {
        if(bannerImage) URL.revokeObjectURL(bannerImage);

        setBannerImage("");
        setBannerFile(null);
    }

    const handlerEnviar = async (event: React.FormEvent) => {
        event.preventDefault();
        if(!dados.title.trim()){
            setError("O título da comunidade é obrigatório.");
            return;
        }
        if(!dados.description.trim()){
            setError("A descrição da comunidade é obrigatória.");
            return;
        }
        try{
            setError("");
            setLoading(true);

            await new Promise((resolve) => setTimeout(resolve, 700));

            console.log("Enviando para API: ", {
                ...dados,
                banner: bannerFile
            });
            voltar("/sucesso-comunidade");
        }
        catch(error) {
            console.error(error);
            setError("Erro ao criar comunidade.");
        }
        finally {
            setLoading(false);
        }
    }

    return(
        <>
        <BarraTopo title="Criar Comunidade"
        iconType="volta"/>
        <form className="formulario-container" onSubmit={handlerEnviar}>
            {error && <p>{error}</p>}
        <FormularioTexto
        label="Nome da Comunidade"
        placeholder="Defina o  título da comunidade"
        name="title"
        value={dados.title}
        onChange={handleMudanca}/>

        <FormularioTexterea
        label="Descrição da Comunidade"
        placeholder="Faça uma breve descrição a respeito da temática da comunidade"
        name="description"
        value={dados.description}
        onChange={handleMudanca}
        />
        
            <div className="formulario-grupo">
                <label className="formulario-label">Adicionar Foto de Capa: </label>
                
                <div className="capa-banner-wrapper"> 
                    {bannerImage ? (
                        <>
                            <img src={bannerImage} alt="Capa da comunidade" className="capa-preview-imagem-grande" />
                            
                            <button type="button" className="remover-capa-btn" onClick={handleRemoverBanner}>X</button>
                            
                            <div className="capa-overlay-edicao">
                                <IconAnexo />
                            </div>
                        </>
                    ) : (
                        <div className="placeholder-grande">
                            <IconAnexo />
                           
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

        <Botao type="submit" variante="primario">{loading ? "Criando..." : "Criar comunidade"}</Botao>
                    
        </form>
        </>
    )
}