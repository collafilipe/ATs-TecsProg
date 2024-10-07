import { useState } from "react";
import { Cliente2 } from "../../type/clienteInterface";
import './cliente.css';
import { Telefone } from "../../type/telefoneInterface";
import { Endereco } from "../../type/enderecoInterface";
import { Documento } from "../../type/documentoInterface";
import { Dependente } from "../../type/dependenteInterface";

type Props = {
    cliente: Cliente2;
    telefones: Telefone[];
    enderecos: Endereco[];
    documentos: Documento[];
    dependentes: Dependente[];
};


export default function Cliente22(props: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [nome, setNome] = useState('');
    const [nomeSocial, setNomeSocial] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [ddd, setDdd] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [cep, setCep] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [passaporte, setPassaporte] = useState('');
    
    const clienteTelefones = props.telefones.filter(t => t.cliente === props.cliente.clienteID);
    const clienteEnderecos = props.enderecos.filter(e => e.cliente === props.cliente.clienteID);
    const clienteDocumentos = props.documentos.filter(d => d.cliente === props.cliente.clienteID);
    const clienteDependentes = props.dependentes.filter(d2 => d2.cliente === props.cliente.clienteID);
    
    function toggleOpen() {
        setIsOpen(!isOpen);
    }

    async function handleDelete() {
                const response = await fetch(`http://localhost:5555/clientes/clientes/${props.cliente.clienteID}`, {
                    method: 'DELETE',
                });

                window.location.reload();
        }

    function openEditModal() {
        setIsEditModalOpen(true);
    }

    function closeEditModal() {
        setIsEditModalOpen(false);
    }

    async function handleEditar() {
        const response = await fetch(`http://localhost:5555/clientes/clientes/${props.cliente.clienteID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nome,
                nomeSocial: nomeSocial,
                dataNascimento: dataNascimento,
                ddd: ddd,
                numero: telefone,
                rua: endereco,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
                cep: cep,
                rg: rg,
                cpf: cpf,
                passaporte: passaporte,
                
            }),
        });
    
        const data = await response.json();
    
        if (data.status === 200) {
            window.location.reload();
        } else {
            alert(data.message);
        }
    }

    return (
        <div className="item-container">
            <div className="item-sub">
                <div className="item pointer" onClick={toggleOpen}>
                    <div className="flex">
                        <div>
                            <strong>Id: {props.cliente.clienteID}</strong>
                        </div>
                        <div>{props.cliente.nome}</div>
                    </div>
                    <div className="flex">
                        <div className="tipo">
                            <strong>Tipo:</strong>{" "}
                            {props.cliente.titular ? "Dependente" : "Titular"}
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="cliente-info">
                    <div className="detalhes">
                        <h3>Informações básicas</h3>
                        <div className="detalhes-item">
                            <div>
                                <b>Nome Completo: </b>
                                {props.cliente.nome}
                            </div>
                            <div>
                                <b>Nome Social: </b>
                                {props.cliente.nomeSocial}
                            </div>
                        </div>
                        <div className="detalhes-item">
                            <div>
                                <b>Data de Nascimento: </b>
                                {props.cliente.dataNascimento ? new Date(props.cliente.dataNascimento).toLocaleDateString('pt-BR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                }) : 'Data de nascimento não disponível'}
                            </div>
                        </div>
                    </div>
                    <div className="detalhes">
                        <h3>Telefones</h3>
                        <div className="detalhes-item">
                            {clienteTelefones.map((t, i) => (
                                <div key={i}>
                                    <b>Telefone {i + 1}: </b>({t.ddd}) {t.numero}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="detalhes">
                        <h3>Endereço</h3>
                        <div className="detalhes-item">
                            {clienteEnderecos.map((e, i) => (
                                <div key={i}>
                                    <b>Rua: </b>{e.rua}<br />
                                    <b>Bairro: </b>{e.bairro}<br />
                                    <b>Cidade: </b>{e.cidade}<br />
                                    <b>Estado: </b>{e.estado}<br />
                                    <b>Código Postal: </b>{e.cep}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="detalhes">
                        <h3>Documentos</h3>
                        <div className="detalhes-item">
                            {clienteDocumentos.map((d, i) => (
                                <div key={i}>
                                    <b>RG: </b>{d.rg}<br />
                                    <b>CPF: </b>{d.cpf}<br />
                                    <b>Passaporte: </b>{d.passaporte}
                                </div>
                            ))}
                        </div>
                    </div>
    
                    <div className="detalhes">
                        <h3>Dependentes</h3>
                        <div className="detalhes-item">
                            {clienteDependentes.map((d2, i) => (
                                <div key={i}>
                                    <b>Nome: </b>{d2.nome}<br />
                                    <b>Nome Social: </b>{d2.nomeSocial}<br />
                                    <b>Data de Nascimento: </b>
                                    {d2.dataNascimento ? new Date(d2.dataNascimento).toLocaleDateString('pt-BR', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    }) : 'Data de nascimento não disponível'}
                                </div>
                            ))}
                        </div>
                    </div>
    
                    <div className="botoes">
                        <button onClick={handleDelete} className="save button">Deletar</button>
                        <button onClick={openEditModal} className="save button">Editar</button>
                    </div>
    
                    {isEditModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={closeEditModal}>&times;</span>
                                <h2>Editar Cliente</h2>
                                <form onSubmit={handleEditar}>
                                    <label>Nome Completo:</label>
                                    <input
                                        type="text"
                                        defaultValue={props.cliente.nome}
                                        onChange={(e) => setNome(e.target.value ?? props.cliente.nome ?? '')}
                                    />
                                    
                                    <label>Nome Social:</label>
                                    <input
                                        type="text"
                                        defaultValue={props.cliente.nomeSocial}
                                        onChange={(e) => setNomeSocial(e.target.value ?? props.cliente.nomeSocial ?? '')}
                                    />
                                    
                                    <label>Data de Nascimento:</label>
                                    <input
                                        type="date"
                                        defaultValue={props.cliente.dataNascimento}
                                        onChange={(e) => setDataNascimento(e.target.value || props.cliente.dataNascimento || '')}
                                    />
                                    
                                    <label>Telefone:</label>
                                    <input
                                        type="text"
                                        defaultValue={clienteTelefones[0]?.ddd}
                                        onChange={(e) => setDdd(e.target.value || clienteTelefones[0]?.ddd || '')}
                                    />
                                    <input
                                        type="text"
                                        defaultValue={clienteTelefones[0]?.numero}
                                        onChange={(e) => setTelefone(e.target.value || clienteTelefones[0]?.numero || '')}
                                    />
                                    
                                    <label>Endereço:</label>
                                    <input
                                        type="text"
                                        defaultValue={clienteEnderecos[0]?.rua || ''}
                                        onChange={(e) => setEndereco(e.target.value || clienteEnderecos[0]?.rua || '')}
                                    />

                                    <label>Bairro:</label>
                                    <input
                                        type="text"
                                        defaultValue={clienteEnderecos[0]?.bairro}
                                        onChange={(e) => setBairro(e.target.value || clienteEnderecos[0]?.bairro || '')}
                                    />

                                    <label>Cidade:</label>

                                    <input
                                        type="text"
                                        defaultValue={clienteEnderecos[0]?.cidade}
                                        onChange={(e) => setCidade(e.target.value || clienteEnderecos[0]?.cidade || '')}
                                    />

                                    <label>Estado:</label>

                                    <input
                                        type="text"
                                        defaultValue={clienteEnderecos[0]?.estado}
                                        onChange={(e) => setEstado(e.target.value || clienteEnderecos[0]?.estado || '')}
                                    />

                                    <label>CEP:</label>

                                    <input
                                        type="text"
                                        defaultValue={clienteEnderecos[0]?.cep}
                                        onChange={(e) => setCep(e.target.value || clienteEnderecos[0]?.cep || '')}
                                    />
                                    
                                    <label>RG:</label>
                                    <input
                                        type="text"
                                        defaultValue={clienteDocumentos[0]?.rg}
                                        onChange={(e) => setRg(e.target.value || clienteDocumentos[0]?.rg)}
                                    />
                                    
                                    <label>CPF:</label>
                                    <input
                                        type="text"
                                        defaultValue={clienteDocumentos[0]?.cpf}
                                        onChange={(e) => setCpf(e.target.value || clienteDocumentos[0]?.cpf)}
                                    />
                                    
                                    <label>Passaporte:</label>
                                    <input
                                        type="text"
                                        defaultValue={clienteDocumentos[0]?.passaporte}
                                        onChange={(e) => setPassaporte(e.target.value || clienteDocumentos[0]?.passaporte)}
                                    />
                                    
                                    <button className="save button" type="submit">Salvar</button>
                                    <button className="save button" onClick={closeEditModal}>Cancelar</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

}
