import { BsXLg } from "react-icons/bs";
import { Acomodacao } from "../../type/acomodacaoInterface";
import AcomodacaoEditar from "./acomodacaoEditar";
import './acomodacao.css'

type props = {
    acomodacao: Acomodacao;
    delete: Function;
};

export default function Acomodacao2(Acomodacao: props) {

    return (
        <div className="item-container">
            <div className="item-sub">
                <div className="item">
                    <div className="flex">
                        <div><strong>Id: {Acomodacao.acomodacao.id}</strong></div>
                        <div><b>Quarto: </b>{Acomodacao.acomodacao.numero}</div>
                        <div>{Acomodacao.acomodacao.cliente ? <div><b>Cliente: </b>{Acomodacao.acomodacao.cliente?.nome}</div> : 'Livre'}</div>
                    </div>
                    <div className="flex">
                        <div className="tipo"><strong>Tipo:</strong> {Acomodacao.acomodacao.nome}</div>
                    </div>
                </div>
                <div className="acoes">
                    <AcomodacaoEditar
                        acomodacao={Acomodacao.acomodacao} cliente={{
                            id: 0,
                            nome: undefined,
                            nomeSocial: undefined,
                            dataNascimento: undefined,
                            dataCadastro: undefined,
                            telefones: undefined,
                            endereco: undefined,
                            documentos: undefined,
                            dependentes: undefined,
                            titular: undefined
                        }}></AcomodacaoEditar>
                    <BsXLg className="icone" style={{ color: 'red' }} onClick={() => Acomodacao.delete(Acomodacao.acomodacao.id)} />
                </div>
            </div>
        </div>
    );
}