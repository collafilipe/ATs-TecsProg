import { useState } from "react";
import './cliente.css'

export default function CadastrarCliente() {
    const [nome, setNome] = useState('');
    const [nomeSocial, setNomeSocial] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [cep, setCep] = useState('');
    const [telefone1, setTelefone1] = useState('');
    const [telefone2, setTelefone2] = useState('');
    const [tipoCliente, setTipoCliente] = useState('titular');
    const [secaoForm, setSecaoForm] = useState('Informações Básicas');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [passaporte, setPassaporte] = useState('');
    const [idTitular, setIdTitular] = useState('');

    const cadastrar = () => {
        setNome('');
        setNomeSocial('');
        setRua('');
        setBairro('');
        setCidade('');
        setEstado('');
        setCep('');
        setTelefone1('');
        setTelefone2('');
    };

    function changeSecao(valor: string) {
        setSecaoForm(valor);
    }

    const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNome(e.target.value);
    };

    const handleNomeSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNomeSocial(e.target.value);
    };

    const handleRuaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRua(e.target.value);
    };

    const handleBairroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBairro(e.target.value);
    };

    const handleCidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCidade(e.target.value);
    };

    const handleEstadoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEstado(e.target.value);
    };

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCep(e.target.value);
    };

    const handleTelefone1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTelefone1(e.target.value);
    };

    const handleTelefone2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTelefone2(e.target.value);
    };

    const handleRgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRg(e.target.value);
    };

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCpf(e.target.value);
    };

    const handlePassaporteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassaporte(e.target.value);
    };

    const handleIdTitularChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIdTitular(e.target.value);
    };

    return (
        <div className="form-cadastro">
            <h2>Cadastrar cliente</h2>

            <form>
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
                            <input type="text"
                                value={nome} onChange={handleNomeChange}
                                placeholder="Nome *" aria-label="Nome" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text"
                                value={nomeSocial} onChange={handleNomeSocialChange}
                                placeholder="Nome social" aria-label="Nome social" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text"
                                value={nomeSocial} onChange={handleNomeSocialChange}
                                placeholder="Data de nascimento *" aria-label="Data de nascimento" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                }
                {(secaoForm === 'Endereço' && tipoCliente === 'titular') &&
                    <div>
                        <div>
                            <div className="input-group mb-3">
                                <input type="text"
                                    value={rua} onChange={handleRuaChange}
                                    placeholder="Rua *" aria-label="Rua" aria-describedby="basic-addon1" />
                            </div>
                            <div className="input-group mb-3">
                                <input type="text"
                                    value={bairro} onChange={handleBairroChange}
                                    placeholder="Bairro *" aria-label="Bairro" aria-describedby="basic-addon1" />
                            </div>
                            <div>
                                <input type="text"
                                    value={cidade} onChange={handleCidadeChange}
                                    placeholder="Cidade *" aria-label="Cidade" aria-describedby="basic-addon1" />
                            </div>
                            <div>
                                <input type="text"
                                    value={estado} onChange={handleEstadoChange}
                                    placeholder="Estado *" aria-label="Estado" aria-describedby="basic-addon1" />
                            </div>
                            <div>
                                <input type="text"
                                    value={cep} onChange={handleCepChange}
                                    placeholder="CEP *" aria-label="CEP" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                    </div>
                }
                {secaoForm === 'Telefones' &&
                    <div>
                        <div className="input-group mb-4">
                            <input type="text"
                                value={telefone1} onChange={handleTelefone1Change}
                                placeholder="Telefone 1 *" aria-label="Telefone 1" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text"
                                value={telefone2} onChange={handleTelefone2Change}
                                placeholder="Telefone 2" aria-label="Telefone 2" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                }
                {secaoForm === 'Documentos' &&
                    <div>
                        <div className="input-group mb-4">
                            <input type="text"
                                value={rg} onChange={handleRgChange}
                                placeholder="RG *" aria-label="RG" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text"
                                value={cpf} onChange={handleCpfChange}
                                placeholder="CPF *" aria-label="CPF" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text"
                                value={passaporte} onChange={handlePassaporteChange}
                                placeholder="Passaporte" aria-label="passaporte" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                }
                {secaoForm === 'Titular' &&
                    <div>
                        <div className="input-group mb-3">
                            <input type="text"
                                value={idTitular} onChange={handleIdTitularChange}
                                placeholder="ID Titular *" aria-label="Id Titular" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                }
                <div>
                    <div className="button save" onClick={cadastrar}>Cadastrar Cliente</div>
                </div>
            </form>
        </div>
    );
}