import { useEffect, useState } from "react";
import { Acomodacao } from "../../type/acomodacaoInterface"; // Certifique-se de que este arquivo existe
import Quarto from "../../type/quartoInterface"; // Certifique-se de que este arquivo existe
import '../cliente/cliente.css';
import { Cliente2 } from "../../type/clienteInterface";

type Props = {
    acomodacao: Acomodacao;
    quartos: Quarto[];
    clientes: Cliente2[];
};

export default function AcomodacaoComponent(props: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [quarto, setQuarto] = useState<Quarto[]>([]); // Inicializa como um array vazio
    const [cliente, setCliente] = useState<Cliente2[]>([]); // Inicializa como um array vazio

    // Fetch para buscar os quartos
    useEffect(() => {
        fetch("http://localhost:5555/quartos/quartos")
            .then((res) => res.json())
            .then((data) => {
                console.log(data); // Verifique a estrutura do dado retornado
                setQuarto(data || []); // Define como array vazio se undefined
            });
    }, []);

    // Fetch para buscar os clientes
    useEffect(() => {
        fetch("http://localhost:5555/clientes/clientes")
            .then((res) => res.json())
            .then((data) => {
                console.log(data); // Verifique a estrutura do dado retornado
                setCliente(data.clientes || []); // Define como array vazio se undefined
            });
    }, []);

    // Função para deletar a acomodação
    async function handleDelete() {
        const response = await fetch(`http://localhost:5555/acomodacoes/acomodacoes/${props.acomodacao.acomodacaoID}/${props.acomodacao.quarto.quartoID}`, {
            method: 'DELETE',
        });

        window.location.reload();
    }

    // Função para abrir o modal de edição
    function toggleOpen() {
        setIsOpen(!isOpen);
    }

    return (
        <div className="item-container">
            <div className="item-sub">
                <div className="item pointer" onClick={toggleOpen}>
                    <div className="flex">
                        <div>
                            <strong>ID: {props.acomodacao.acomodacaoID}</strong>
                        </div>
                        <div>{props.acomodacao.quarto.tipo}</div>
                    </div>
                    <div className="flex">
                        <div className="tipo">
                            <strong>Cliente:</strong> {props.acomodacao.cliente.nome}
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="acomodacao-info">
                    <div className="detalhes">
                        <h3>Detalhes da Acomodação</h3>
                        <div className="detalhes-item">
                            <b>Quarto: </b>{props.acomodacao.quarto.tipo}<br />
                            <b>Cliente: </b>{props.acomodacao.cliente.nome}
                        </div>
                    </div>
                    <div className="botoes">
                        <button onClick={handleDelete} className="save button">Deletar</button>
                    </div>

                    {isEditModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}