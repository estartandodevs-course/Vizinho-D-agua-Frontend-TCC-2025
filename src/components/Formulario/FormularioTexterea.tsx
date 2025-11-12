import './Formulario.css'

type FormularioTextereaProps = {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    name: string;
}

export default function FormularioTexterea({ label, placeholder, value, onChange, name }: FormularioTextereaProps) {
    return(
        <div className='formulario-grupo'>
            <label className='formulario-label' htmlFor={name}>{label}</label>
            <textarea className='formulario-textarea'
                placeholder={placeholder}
                rows={5}
                value={value}
                onChange={onChange}
                name={name}
                id={name}
            />
        </div>
    )
}