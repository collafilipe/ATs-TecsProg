/* eslint-disable @typescript-eslint/no-unused-vars */
import { BsPencil } from "react-icons/bs";
import { Cliente2 } from "../../type/clienteInterface";
import { useState } from "react";
import { IMaskInput } from "react-imask";
import Modal from 'react-modal';
import './cliente.css'

type Props = {
    cliente: Cliente2;
}

const customStyles = {
    content: {
        backgroundColor: "rgb(216, 240, 255)",
        padding: "0 1em",
        marginLeft: "15%",
        marginRight: "15%",
        marginTop: "0%",
        overflow: "auto",
    },
};

export default function EditarCliente(props: Props) {
    let endereco = props.cliente.titular ? props.cliente.titular.endereco : props.cliente.endereco;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [secaoForm, setSecaoForm] = useState('Informações Básicas');
    const [nome, setNome] = useState(props.cliente.nome);
    const [nomeSocial, setNomeSocial] = useState(props.cliente.nomeSocial);
    const [rua, setRua] = useState(endereco?.rua);
    const [bairro, setBairro] = useState(endereco?.bairro);
    const [cidade, setCidade] = useState(endereco?.cidade);
    const [estado, setEstado] = useState(endereco?.estado);
    const [cep, setCep] = useState(endereco?.cep);
    const [telefones, setTelefones] = useState(props.cliente.telefones);

    function handleChange(event: any, setter: any) {
        const value = event.target.value;
        setter(value);
    }

    function handleTelefoneChange(event: any, index: number) {
        const value = event.target.value;
        let tels = telefones?.slice();
        if (tels) {
            tels[index].ddd = value.slice(1, 3);
            tels[index].numero = value.slice(5);
            setTelefones(tels);
        }
    }

    function changeSecao(valor: string) {
        setSecaoForm(valor);
    }

    return (
        <>
            <BsPencil onClick={handleShow} className="edit icone" />

            <Modal
                isOpen={show}
                onRequestClose={handleClose}
                contentLabel="Editar cliente"
                style={customStyles}
            >
                <div className="modal-container">
                    <div className="modal-header">
                        <div></div>
                        <h1>Editar cliente</h1>
                        <div className="pointer" onClick={handleClose}><b>Fechar</b></div>
                    </div>
                    <div className="modal-body">
                        <form id='editar-cliente'>
                            <div className='seletor-secao'>
                                <div className={secaoForm === 'Informações Básicas' ? 'secao-ativa' : ''} onClick={() => changeSecao('Informações Básicas')}>Informações</div>
                                <div className={secaoForm === 'Endereço' ? 'secao-ativa' : ''} onClick={() => changeSecao('Endereço')}>Endereço</div>
                                <div className={secaoForm === 'Telefones' ? 'secao-ativa' : ''} onClick={() => changeSecao('Telefones')}>Telefones</div>
                            </div>
                            <h4>{secaoForm}</h4>
                            {secaoForm === 'Informações Básicas' &&
                                <section>
                                    <div className="input-item">
                                        <label htmlFor="nome">Nome</label>
                                        <input className="form-control" id="nome" type="text" defaultValue={props.cliente.nome} onChange={(e) => handleChange(e, setNome)}></input>
                                    </div>
                                    <div className="input-item">
                                        <label htmlFor="nomeSocial">Nome Social</label>
                                        <input className="form-control" id="nomeSocial" type="text" defaultValue={props.cliente.nomeSocial} onChange={(e) => handleChange(e, setNomeSocial)}></input>
                                    </div>
                                </section>
                            }
                            {secaoForm === 'Endereço' &&
                                <section>
                                    <div className="input-item">
                                        <label htmlFor="nome">Rua</label>
                                        <input className="form-control" id="nome" type="text" defaultValue={endereco?.rua} onChange={(e) => handleChange(e, setRua)}></input>
                                    </div>
                                    <div className="input-item">
                                        <label htmlFor="bairro">Bairro</label>
                                        <input className="form-control" id="bairro" type="text" defaultValue={endereco?.bairro} onChange={(e) => handleChange(e, setBairro)}></input>
                                    </div>
                                    <div className="input-item">
                                        <label htmlFor="cidade">Cidade</label>
                                        <input className="form-control" id="cidade" type="text" defaultValue={endereco?.cidade} onChange={(e) => handleChange(e, setCidade)}></input>
                                    </div>
                                    <div className="input-item">
                                        <label htmlFor="estado">Estado</label>
                                        <input className="form-control" id="estado" type="text" defaultValue={endereco?.estado} onChange={(e) => handleChange(e, setEstado)}></input>
                                    </div>
                                    <div className="input-item">
                                        <label htmlFor="cep">CEP</label>
                                        <input className="form-control" id="cep" type="text" defaultValue={endereco?.cep} onChange={(e) => handleChange(e, setCep)}></input>
                                    </div>
                                </section>
                            }
                            {secaoForm === 'Telefones' &&
                                <section>
                                    {props.cliente.telefones?.map((t: any, i: any) => {
                                        return <div className="input-item" key={i + 1}>
                                            <label htmlFor={`telefone-${i + 1}`}>Telefone {i + 1}</label>
                                            <IMaskInput
                                                className="form-control" id={`telefone-${i + 1}`} type="text" defaultValue={t.ddd + t.numero}
                                                mask='(00) 000000000'
                                                onChange={(e: any) => handleTelefoneChange(e, i)}
                                            />
                                        </div>
                                    })}
                                </section>
                            }
                        </form>
                    </div>
                    <div className="modal-footer">
                        <div className="cancel button" onClick={handleClose}>Cancelar</div>
                        <div className="save button" onClick={handleClose}>Salvar</div>
                    </div>
                </div>
            </Modal>
        </>
    );
}