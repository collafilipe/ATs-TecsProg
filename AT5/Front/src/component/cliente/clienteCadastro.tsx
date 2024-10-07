import { useEffect, useState } from "react";
import './cliente.css';
import { Titular } from "../../type/titularInterface";
import Swal from 'sweetalert2';

export default function CadastrarCliente() {
    const [nome, setNome] = useState('');
    const [nomeSocial, setNomeSocial] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [cep, setCep] = useState('');
    const [ddd, setDDD] = useState('');
    const [telefone2, setTelefone2] = useState('');
    const [tipoCliente, setTipoCliente] = useState('titular');
    const [secaoForm, setSecaoForm] = useState('Informações Básicas');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [passaporte, setPassaporte] = useState('');
    const [idTitular, setIdTitular] = useState<number | null>(null);
    const [clienteIds, setClienteIds] = useState<Titular[]>([]);

    // Reset form
    const cadastrar = () => {
        setNome('');
        setNomeSocial('');
        setRua('');
        setBairro('');
        setCidade('');
        setEstado('');
        setCep('');
        setDDD('');
        setTelefone2('');
        setRg('');
        setCpf('');
        setPassaporte('');
        setIdTitular(null);
    };

    function changeSecao(valor: string) {
        setSecaoForm(valor);
    }

    useEffect(() => {
        fetch('http://localhost:5555/clientes/clientes')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta da rede');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data.clientes)) {
                    setClienteIds(data.clientes);
                } else {
                    console.error('Os dados recebidos não são um array:', data);
                    setClienteIds([]);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar clientes:', error);
                setClienteIds([]);
            });
    }, []);

    const handleSubmitDependente = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5555/clientes/clientes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome,
                nomeSocial,
                dataNascimento,
                rua,
                bairro,
                cidade,
                estado,
                cep,
                ddd,
                numero: telefone2,
                rg,
                cpf,
                passaporte,
            })
        });

        if (response.ok) {
            Swal.fire('Sucesso!', 'Cliente cadastrado com sucesso.', 'success');
            cadastrar();
        } else {
            Swal.fire('Erro!', 'Falha ao cadastrar cliente.', 'error');
        }

        window.location.reload();
    };

    const handleSubmitCliente = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const response = await fetch('http://localhost:5555/dependentes/dependentes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome,
                nomeSocial,
                dataNascimento,
                ddd,
                numero: telefone2,
                rg,
                cpf,
                passaporte,
                clienteID: idTitular, // Use o idTitular aqui
            })
        });
    
        if (response.ok) {
            Swal.fire('Sucesso!', 'Dependente cadastrado com sucesso.', 'success');
            cadastrar(); // Reseta o formulário
        } else {
            const errorData = await response.json(); // Tente obter dados de erro do servidor
            Swal.fire('Erro!', errorData.message || 'Falha ao cadastrar dependente.', 'error');
        }
    
        // Remover window.location.reload(); para evitar recarregamento
    };
    return (
        <div className="form-cadastro">
            <h2>Cadastrar {tipoCliente === "titular" ? "cliente titular" : "dependente"}</h2>
    
            <form onSubmit={tipoCliente === "titular" ? handleSubmitDependente : handleSubmitCliente}>
                <div className="cliente-select">
                    <label htmlFor="cliente">Tipo de cliente:</label>
                    <select value={tipoCliente} onChange={(e) => setTipoCliente(e.target.value)}>
                        <option value={"titular"}>Titular</option>
                        <option value={"dependente"}>Dependente</option>
                    </select>
                </div>
                <div className="seletor-secao">
                    <div className={secaoForm === 'Informações Básicas' ? 'secao-ativa' : ''} onClick={() => changeSecao('Informações Básicas')}>Informações</div>
                    {tipoCliente === 'titular' && <div className={secaoForm === 'Endereço' ? 'secao-ativa' : ''} onClick={() => changeSecao('Endereço')}>Endereço</div>}
                    <div className={secaoForm === 'Telefones' ? 'secao-ativa' : ''} onClick={() => changeSecao('Telefones')}>Telefones</div>
                    <div className={secaoForm === 'Documentos' ? 'secao-ativa' : ''} onClick={() => changeSecao('Documentos')}>Documentos</div>
                    {tipoCliente === 'dependente' && <div className={secaoForm === 'Titular' ? 'secao-ativa' : ''} onClick={() => changeSecao('Titular')}>Titular</div>}
                </div>
                
                {secaoForm === 'Informações Básicas' &&
                    <div>
                        <div className="input-group mb-3">
                            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome *" required />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" value={nomeSocial} onChange={(e) => setNomeSocial(e.target.value)} placeholder="Nome social" />
                        </div>
                        <div className="input-group mb-3">
                            <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} placeholder="Data de nascimento *" required />
                        </div>
                    </div>
                }
    
                {(secaoForm === 'Endereço' && tipoCliente === 'titular') &&
                    <div>
                        <div className="input-group mb-3">
                            <input type="text" value={rua} onChange={(e) => setRua(e.target.value)} placeholder="Rua *" required />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} placeholder="Bairro *" required />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} placeholder="Cidade *" required />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} placeholder="Estado *" required />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} placeholder="CEP *" required />
                        </div>
                    </div>
                }
    
                {secaoForm === 'Telefones' &&
                    <div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                value={ddd}
                                onChange={(e) => setDDD(e.target.value)}
                                placeholder="DDD *"
                                required
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                value={telefone2}
                                onChange={(e) => setTelefone2(e.target.value)}
                                placeholder="Número *"
                                required
                            />
                        </div>
                    </div>
                }
    
                {secaoForm === 'Documentos' &&
                    <div>
                        <div className="input-group mb-3">
                            <input type="text" value={rg} onChange={(e) => setRg(e.target.value)} placeholder="RG" />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="CPF" />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" value={passaporte} onChange={(e) => setPassaporte(e.target.value)} placeholder="Passaporte" />
                        </div>
                    </div>
                }
    
                {/* Seção de titular (apenas para dependente) */}
                {secaoForm === 'Titular' && tipoCliente === 'dependente' &&
                    <div>
                        <select onChange={(e) => setIdTitular(Number(e.target.value))}>
                            <option>Selecione o titular *</option>
                            {clienteIds.map((cliente) => (
                                <option key={cliente.clienteID} value={cliente.clienteID}>{cliente.nome}</option>
                            ))}
                        </select>
                    </div>
                }
    
                <button type="submit" className="save button">{tipoCliente === 'titular' ? 'Cadastrar Cliente' : 'Cadastrar Dependente'}</button>
            </form>
        </div>
    );
}
