import { useEffect, useState } from "react";
import './acomodacao.css';
import Swal from 'sweetalert2';
import { Cliente2 } from "../../type/clienteInterface";
import Quarto from "../../type/quartoInterface";

export default function AcomodacaoCadastro() {
    const [quartos, setQuartos] = useState<Quarto[]>([]);
    const [secaoForm, setSecaoForm] = useState('Informações Básicas');
    const [idTitular, setIdTitular] = useState('');
    const [idAcomodacao, setIdAcomodacao] = useState('');
    const [titulares, setTitulares] = useState<Cliente2[]>([]);

    const cadastrar = () => {
        setQuartos([]);
        setIdTitular('');
        setIdAcomodacao('');
    };

    const changeSecao = (valor: string) => {
        setSecaoForm(valor);
    };

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
                    setTitulares(data.clientes);
                } else {
                    console.error('Os dados recebidos não são um array:', data);
                    setTitulares([]);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar titulares:', error);
                setTitulares([]);
            });

        fetch('http://localhost:5555/quartos/quartos')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta da rede');
                }
                return response.json();
            })
            .then(data => {
                // Ajusta o estado para os dados de quartos recebidos
                setQuartos(data);
            })
            .catch(error => {
                console.error('Erro ao buscar acomodações:', error);
                setQuartos([]);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5555/acomodacoes/acomodacoes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                quartoID: idAcomodacao,
                clienteID: idTitular,
            }),
        });

        window.location.reload();

        if (response.ok) {
            Swal.fire('Sucesso!', 'Acomodação cadastrada com sucesso.', 'success');
            cadastrar();
        } else {
            Swal.fire('Erro!', 'Falha ao cadastrar acomodação.', 'error');
        }
    };

    return (
        <div className="form-cadastro">
            <h2>Cadastrar Acomodação</h2>

            <form onSubmit={handleSubmit}>
                <div className='seletor-secao'>
                    <div className={secaoForm === 'Informações Básicas' ? 'secao-ativa' : ''} onClick={() => changeSecao('Informações Básicas')}>Informações</div>
                </div>
                {secaoForm === 'Informações Básicas' &&
                    <div>
                        <div className="input-group mb-3">
                            <select value={idAcomodacao} onChange={(e) => setIdAcomodacao(e.target.value)} aria-label="Quarto" required>
                                <option value="">Selecione um Quarto</option>
                                {quartos.map((quarto) => (
                                    <option key={quarto.quartoID} value={quarto.quartoID}>
                                        Quarto {quarto.quartoID} - {quarto.tipo} - {quarto.quartoStatus}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group mb-3">
                            <select value={idTitular} onChange={(e) => setIdTitular(e.target.value)} aria-label="Id Cliente">
                                <option value="">Selecione um Cliente</option>
                                {titulares.map((titular) => (
                                    <option key={titular.clienteID} value={titular.clienteID}>
                                        {titular.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                }
                <div>
                    <button type="submit" className="button save">Cadastrar Acomodação</button>
                </div>
            </form>
        </div>
    );
}