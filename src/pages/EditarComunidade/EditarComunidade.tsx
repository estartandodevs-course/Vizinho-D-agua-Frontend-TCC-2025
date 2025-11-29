import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { IconAnexo } from "../../assets/icons";
import BarraTopo from "../../components/BarraTopo/BarraTopo";
import FormularioTexto from "../../components/Formulario/FormularioTexto";
import FormularioTexterea from "../../components/Formulario/FormularioTexterea";
import Botao from "../../components/Botao/Botao";
import Carregando from "../../components/Carregando/Carregando";

import "../CriarComunidade/CriarComunidade.css";
import "./EditarComunidade.css";

import { mockComunidades, type Comunidade } from "../../mocks/comunidades.mock";

type ComunidadeEditable = Omit<Comunidade, "coverImage"> & {
    coverImage: string | null;
};

export default function EditarComunidade() {
    const { id } = useParams();
    const voltar = useNavigate();

    const [dados, setDados] = useState<ComunidadeEditable | null>(null);
    const [bannerImage, setBannerImage] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        if (!id) {
            setError("ID inválido.");
            setLoading(false);
            return;
        }

        const comunidade = mockComunidades.find(c => c.id === id);

        if (!comunidade) {
            setError("Comunidade não encontrada.");
            setLoading(false);
            return;
        }

        const editavel: ComunidadeEditable = {
            ...comunidade,
            coverImage: comunidade.coverImage ?? null,
        };

        setDados(editavel);
        setBannerImage(editavel.coverImage);

        setLoading(false);
    }, [id]);


    const handleMudanca = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setDados(prev =>
            prev ? { ...prev, [name]: value } : prev
        );
    };

    const handleImagemChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;

        const arquivo = e.target.files[0];
        const preview = URL.createObjectURL(arquivo);

        setBannerImage(preview);

        setDados(prev =>
            prev ? { ...prev, coverImage: preview } : prev
        );
    };

    const removerBanner = () => {
        if (bannerImage) URL.revokeObjectURL(bannerImage);

        setBannerImage(null);

        setDados(prev =>
            prev ? { ...prev, coverImage: null } : prev
        );
    };

    const handlerEnviar = (e: FormEvent) => {
        e.preventDefault();

        voltar("/sucesso-editar-comunidade");
    };


    if (loading) return <Carregando />;
    if (error) return <p className="error-message">{error}</p>;
    if (!dados) return <p>Comunidade não encontrada.</p>;


    return (
        <>
            <BarraTopo title="Editar Comunidade" iconType="volta" />

            <form className="formulario-container" onSubmit={handlerEnviar}>

                <FormularioTexto
                    label="Nome da Comunidade"
                    name="title"
                    value={dados.title}
                    onChange={handleMudanca}
                />

                <FormularioTexterea
                    label="Descrição"
                    name="description"
                    value={dados.description}
                    onChange={handleMudanca}
                />

                <div className="formulario-grupo">
                    <label>Foto de Capa:</label>

                    <div className="capa-banner-wrapper">
                        {bannerImage ? (
                            <>
                                <img src={bannerImage} className="capa-preview-imagem-grande" />

                                <button
                                    type="button"
                                    className="remover-capa-btn"
                                    onClick={removerBanner}
                                >
                                    X
                                </button>

                                <div className="capa-overlay-edicao"><IconAnexo /></div>
                            </>
                        ) : (
                            <div className="placeholder-grande">
                                <IconAnexo />
                            </div>
                        )}

                        <input
                            type="file"
                            className="input-file-on-top"
                            accept="image/*"
                            onChange={handleImagemChange}
                        />
                    </div>
                </div>

                <div className="formulario-botoes-footer">
                    <button type="button" className="botao-cancelar" onClick={() => voltar(-1)}>
                        Cancelar
                    </button>

                    <Botao type="submit" variante="primario">Editar Comunidade</Botao>
                </div>

            </form>
        </>
    );
}
