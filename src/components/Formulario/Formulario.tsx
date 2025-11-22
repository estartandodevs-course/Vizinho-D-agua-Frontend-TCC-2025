import type React from "react";
import { IconSetaBaixo } from "../../assets/icons";
import './Formulario.css';

type inputSelectProps = {
    label: string;
    placeholder?: string;
    opcoes: string[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    name: string;
}

export default function Formulario({ label, placeholder, opcoes, value, onChange, name, }: inputSelectProps) {
    return(
        <div className="formulario-grupo">
            <label className="formulario-label" htmlFor={name}>{label}</label>
            <div className="select-container">
                <select className="formulario-select"
                    value={value}
                    onChange={onChange}
                    name={name}
                    id={name}>
                    <option value="" disabled>{placeholder}</option>
                    {opcoes.map((opcao, index) => (
                        <option key={index} value={opcao}>{opcao}</option>
                    ))}
                </select>
                <IconSetaBaixo className="select-icone" />
            </div>
        </div>
    )
}