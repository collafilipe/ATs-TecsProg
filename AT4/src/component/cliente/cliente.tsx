import { useState } from "react";
import { Cliente2 } from "../../type/clienteInterface";
import { BsXLg } from "react-icons/bs";
import { Dependente } from "../../type/dependenteInterface";
import EditarCliente from "./clienteEditar";
import './cliente.css'

type Props = {
    cliente: Cliente2;
    addCliente: Function;
    deletarCliente: Function;
};

export default function Cliente22(props: Props) {
    let [isOpen, setIsOpen] = useState(false);
    let endereco = props.cliente.titular
        ? props.cliente.titular.endereco
        : props.cliente.endereco;

    function toggleOpen() {
        setIsOpen(!isOpen);
    }

    return (
        <div className="item-container">
            <div className="item-sub">
                <div className="item  pointer" onClick={toggleOpen}>
                    <div className="flex">
                        <div>
                            <strong>Id: {props.cliente.id}</strong>
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
                <div className="acoes">
                    <EditarCliente cliente={props.cliente}></EditarCliente>
                    <BsXLg
                        className="icone"
                        style={{ color: "red" }}
                        onClick={() => props.deletarCliente(props.cliente.id)}
                    />
                </div>
            </div>
            {isOpen ? (
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
                                <b>Data de nascimento: </b>
                                {props.cliente.dataNascimento?.getDay() +
                                    "/" +
                                    props.cliente.dataNascimento?.getMonth() +
                                    "/" +
                                    props.cliente.dataNascimento?.getFullYear()}
                            </div>
                            <div>
                                <b>Data de cadastro: </b>
                                {props.cliente.dataCadastro?.getDay() +
                                    "/" +
                                    props.cliente.dataCadastro?.getMonth() +
                                    "/" +
                                    props.cliente.dataCadastro?.getFullYear()}
                            </div>
                        </div>
                    </div>
                    <div className="detalhes">
                        <h3>Telefones</h3>
                        <div className="detalhes-item">
                            {props.cliente.telefones?.map((t: any, i: any) => {
                                return (
                                    <div>
                                        <b>Telefone {i + 1}: </b>({t.ddd}) {t.numero}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="detalhes">
                        <h3>Endereço</h3>
                        <div className="detalhes-item">
                            <div>
                                <b>Rua: </b>
                                {endereco?.rua}
                            </div>
                            <div>
                                <b>Bairro: </b>
                                {endereco?.bairro}
                            </div>
                            <div>
                                <b>Cidade: </b>
                                {endereco?.cidade}
                            </div>
                            <div>
                                <b>Estado: </b>
                                {endereco?.estado}
                            </div>
                            <div>
                                <b>Código Postal: </b>
                                {endereco?.cep}
                            </div>
                        </div>
                    </div>
                    <div className="detalhes">
                        <h3>
                            {props.cliente.titular === undefined
                                ? "Dependentes"
                                : "Titular"}
                        </h3>
                        <div className="detalhes-item">
                            {props.cliente.dependentes !== undefined ? (
                                props.cliente.dependentes?.map(
                                    (d: Dependente, i: any) => {
                                        return (
                                            <div className="detalhes">
                                                <h4>Dependente {i + 1}</h4>
                                                <div>
                                                    <div className="detalhes-item">
                                                        <div>
                                                            <b>Nome: </b>
                                                            {d.nome}
                                                        </div>
                                                        <div>
                                                            <b>Nome Social: </b>
                                                            {d.nomeSocial}
                                                        </div>
                                                        <div>
                                                            <b>Data de nascimento: </b>
                                                            {d.dataNascimento?.getDay() +
                                                                "/" +
                                                                d.dataNascimento?.getMonth() +
                                                                "/" +
                                                                d.dataNascimento?.getFullYear()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                )
                            ) : (
                                <div>
                                    <div>
                                        <div className="detalhes-item">
                                            <div>
                                                <b>Nome: </b>
                                                {props.cliente.titular?.nome}
                                            </div>
                                            <div>
                                                <b>Nome Social: </b>
                                                {props.cliente.titular?.nomeSocial}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="detalhes-item">
                                            {props.cliente.titular?.telefones?.map(
                                                (t: any, i: any) => {
                                                    return (
                                                        <div>
                                                            <b>Telefone {i + 1}: </b>({t.ddd}){" "}
                                                            {t.numero}
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}