import { useEffect, useState } from "react";
import { Cliente2 } from "../../type/clienteInterface";
import Cliente from "./cliente";
import './cliente.css'

export default function ClientesList() {
    let proximoId = 3;

    let clienteList = [
        { id: 1, nome: "Titular", nomeSocial: "Titular", endereco: {
            rua: "Rua 1", bairro: "Bairro 1", cidade: "Cidade 1", codigoPostal: "12345678", estado: "SP", pais: "Brasil" 
        }, dataNascimento: new Date("1993-07-15"), dataCadastro: new Date(), documentos: [{tipo: "RG", numero: "123456789", 
            dataExpedicao: new Date("2015-07-15")}, {tipo: "CPF", numero: "987654321", 
            dataExpedicao: new Date("2015-07-15")}], telefones: [{ddd:"12", numero: "123456789"}, {ddd:"12", numero: "123456789"}, ], dependentes: [
                {id:2, dataNascimento:  new Date("2003-06-05"), documentos: [{tipo: "RG", numero: "123456780", 
                    dataExpedicao: new Date("2019-09-16")}, {tipo: "CPF", numero: "987654320", 
                    dataExpedicao: new Date("2014-12-01")}], nome: "Dependente", nomeSocial: "Dependente"}
            ]
        },
        { id: 2, nome: "Dependente", nomeSocial: "Dependente", dataNascimento: new Date("2003-06-05"), dataCadastro: new Date(), documentos: [{tipo: "RG", numero: "123456780", 
            dataExpedicao: new Date("2019-09-16")}, {tipo: "CPF", numero: "987654320", 
            dataExpedicao: new Date("2014-12-01")}], telefones: [{ddd:"12", numero: "993456789"}], titular: {
                id:1, endereco: {rua: "Rua 1", bairro: "Bairro 1", cidade: "Cidade 1", codigoPostal: "12345678", estado: "SP", pais: "Brasil"},
                nome: "Titular", nomeSocial: "Titular", telefones: [{ddd:"12", numero: "123456789"}]
            }
        }
    ]
    let [clientes, setClientes] = useState<Cliente2[]>(clienteList);

    useEffect(() => {         
    }, [clientes]);

    function addCliente(cliente: Cliente2) {
        cliente.id = proximoId;
        proximoId += 1;
        setClientes([...clientes, cliente]);
    }
    function deletarCliente(id: number) {
        setClientes(clientes.filter(c => c.id !== id));
    }

    return (
        <div className="list">
            <h2>Clientes</h2>
            <div className="list-itens">
                {clientes.map(c => (
                    <Cliente
                        cliente={c}
                        key={c.id}
                        addCliente={addCliente}
                        deletarCliente={deletarCliente}
                    />
                ))}
            </div>
        </div>
    );
}
