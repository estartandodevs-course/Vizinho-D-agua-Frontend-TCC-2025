import { IconAnexo } from "../../assets/icons";
import BarraTopo from "../../components/BarraTopo/BarraTopo";
import FormularioTexto from "../../components/Formulario/FormularioTexto";
import FormularioTexterea from "../../components/Formulario/FormularioTexterea";
import Botao from "../../components/Botao/Botao";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type DadosComunidade ={
    nome: string;
    descricao: string;
}


export default function CriarComunidade() {
    const voltar = useNavigate();

    const [dados, setDados] = useState<DadosComunidade>({
        nome: "",
        descricao: ""
    });

    const handleMudanca = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
       setDados((prev) => ({...prev, [name]: value}));
    }

    const handlerEnviar = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Comunidade criada:", dados);
        voltar("/sucesso-comunidade");
    }

    return(
        <>
        <BarraTopo title="Criar Comunidade"
        iconType="volta"/>
        <form className="formulario-container" onSubmit={handlerEnviar}>

        <FormularioTexto
        label="Nome da Comunidade"
        placeholder="Defina o  título da comunidade"
        name="nome"
        value={dados.nome}
        onChange={handleMudanca}/>

        <FormularioTexterea
        label="Descrição da Comunidade"
        placeholder="Faça uma breve descrição a respeito da temática da comunidade"
        name="descricao"
        value={dados.descricao}
        onChange={handleMudanca}
        />
        <div className="formulario-grupo">
            <label className="formulario-label">Adicionar Foto de Capa: </label>
            <div className="anexo-placeholder">
                <IconAnexo />
            </div>
        </div>
        <Botao type="submit" variante="primario">Criar comunidade</Botao>

        </form>
        </>
    )
}