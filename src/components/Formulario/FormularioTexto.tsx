import './Formulario.css';


type FormularioTextoProps = {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
}

export default function FormularioTexto({ label, placeholder, value, onChange, name }: FormularioTextoProps) {

    return(
        <div className='formulario-grupo'>
            <label className='formulario-label' htmlFor={name}>{label}</label>
            <input
                className='formulario-input'
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                id={name}
            />
        </div>
    )
}