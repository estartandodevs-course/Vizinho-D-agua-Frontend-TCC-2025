import "./ModalDetalhes.css";
import type { Denuncia } from "../../mocks/denuncias.mock";
import { IconX } from "../../assets/icons";

type ModalDetalhesProps = {
    denuncia: Denuncia;
    onClose: () => void;
}

export default function ModalDetalhes({ denuncia, onClose }: ModalDetalhesProps) {
    return(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}> 

                <div className="modal-header">
                    <h2>Detalhes da denúncia</h2>
                    <button onClick={onClose} className="modal-botao-fechar">
                        <IconX />
                    </button>
                </div>
                <div className="modal-corpo">
                    <div className="modal-grupo">
                        <strong>Tipo de denúncia: </strong>
                        <p>{denuncia.reportType }</p>
                    </div>

                    <div className="modal-grupo">
                        <strong>Empresa de abastecimento responsável: </strong>
                        <p>{denuncia.company}</p>
                    </div>

                    <div className="modal-grupo">
                        <strong>Localidade afetada: </strong>
                        <p>{denuncia.location}</p>
                    </div>

                    <div className="modal-grupo">
                        <strong>Descrição: </strong>
                        <p>{denuncia.description}</p>
                    </div>

                    <div className="modal-grupo">
                        <strong>Anexos: </strong>
                        {denuncia.attachments && denuncia.attachments.length > 0 && (
                        <div className="modal-anexos">
                           {denuncia.attachments?.map((anexoUrl, index) => (
                                <img 
                                key={index}
                                src={anexoUrl}
                                alt={`Anexo ${index + 1}`}
                                />
                           ))}
                        </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}