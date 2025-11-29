import { type ChangeEvent, type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IconAnexo } from "../../assets/icons";
import BarraTopo from "../../components/BarraTopo/BarraTopo";
import FormularioTexto from "../../components/Formulario/FormularioTexto";
import FormularioTexterea from "../../components/Formulario/FormularioTexterea";
import Botao from "../../components/Botao/Botao";

import "./CriarComunidade.css";

type DadosComunidade = {
    title: string;
    description: string;
};

export default function CriarComunidade() {
    const voltar = useNavigate();

    const [dados, setDados] = useState<DadosComunidade>({
        title: "",
        description: "",
    });

    const [bannerImage, setBannerImage] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleMudanca = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setDados(prev => ({ ...prev, [name]: value }));
    };

    const handleImagemChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (bannerImage) URL.revokeObjectURL(bannerImage);

        if (e.target.files && e.target.files[0]) {
            const arquivo = e.target.files[0];

            if (!arquivo.type.startsWith("image/")) {
                setError("Por favor, selecione uma imagem válida.");
                setBannerImage("");
                return;
            }

            setError("");
            const previewUrl = URL.createObjectURL(arquivo);
            setBannerImage(previewUrl);
        }
    };

    const handleRemoverBanner = () => {
        if (bannerImage) URL.revokeObjectURL(bannerImage);
        setBannerImage("");
    };

    const handlerEnviar = (event: FormEvent) => {
        event.preventDefault();

        if (!dados.title.trim()) {
            setError("O título é obrigatório.");
            return;
        }

        if (!dados.description.trim()) {
            setError("A descrição é obrigatória.");
            return;
        }

        setLoading(true);
        setError("");

        voltar("/sucesso-comunidade");
    };

    return (
        <>
            <BarraTopo title="Criar Comunidade" iconType="volta" />

            <form className="formulario-container" onSubmit={handlerEnviar}>
                {error && <p className="error-message">{error}</p>}

                <FormularioTexto
                    label="Nome da Comunidade"
                    placeholder="Defina o título da comunidade"
                    name="title"
                    value={dados.title}
                    onChange={handleMudanca}
                />

                <FormularioTexterea
                    label="Descrição da Comunidade"
                    placeholder="Faça uma breve descrição da comunidade"
                    name="description"
                    value={dados.description}
                    onChange={handleMudanca}
                />

                <div className="formulario-grupo">
                    <label className="formulario-label">Adicionar Foto de Capa:</label>

                    <div className="capa-banner-wrapper">
                        {bannerImage ? (
                            <>
                                <img
                                    src={bannerImage}
                                    alt="Capa da comunidade"
                                    className="capa-preview-imagem-grande"
                                />

                                <button
                                    type="button"
                                    className="remover-capa-btn"
                                    onClick={handleRemoverBanner}
                                >
                                    X
                                </button>

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

                <Botao type="submit" variante="primario">
                    {loading ? "Criando..." : "Criar comunidade"}
                </Botao>
            </form>
        </>
    );
}
