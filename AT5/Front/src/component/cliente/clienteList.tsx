import { useEffect, useState } from "react";
import { Cliente2 } from "../../type/clienteInterface";
import Cliente from "./cliente";
import './cliente.css';
import { Telefone } from "../../type/telefoneInterface";
import { Endereco } from "../../type/enderecoInterface";
import { Documento } from "../../type/documentoInterface";
import { Dependente } from "../../type/dependenteInterface";

export default function ClientesList() {
    const [clientes, setClientes] = useState<Cliente2[]>([]);
    const [telefones, setTelefones] = useState<Telefone[]>([]);
    const [enderecos, setEnderecos] = useState<Endereco[]>([]);
    const [documentos, setDocumentos] = useState<Documento[]>([]);
    const [dependentes, setDependentes] = useState<Dependente[]>([]);

    useEffect(() => {
        fetch("http://localhost:5555/clientes/clientes")
            .then((res) => res.json())
            .then((data) => {
                setClientes(data.clientes);
                setTelefones(data.telefones.message);
                setEnderecos(data.enderecos.message);
                setDocumentos(data.documentos.message);
                setDependentes(data.dependentes.message);
            });
    }, []);

    return (
        <div className="list">
            <h2>Clientes</h2>
            <div className="list-itens">
                {clientes.map(c => (
                    <Cliente
                        cliente={c}
                        telefones={telefones}
                        enderecos={enderecos}
                        documentos={documentos}
                        dependentes={dependentes}
                        key={c.clienteID}                   />
                ))}
            </div>
        </div>
    );
}
