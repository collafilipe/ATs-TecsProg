import { useState } from "react";
import { Acomodacao } from "../../type/acomodacaoInterface";
import Acomodacao2 from "./acomodacao";
import './acomodacao.css'

export default function AcomodacaoList() {
    let acomodacaoList: Acomodacao[] = [
        {id: 1, nome: 'Solteiro Simples', numero: 15, cliente:{id: 1, nome: 'Titular'}}, 
        {id: 2, nome: 'Familia Simples', numero: 20}, 
        {id: 3, nome: 'Familia Super', numero: 50}, 
    ];

    let [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>(acomodacaoList);

    function deletarAcomodacao(id: number) {
        setAcomodacoes(acomodacoes.filter(a => a.id !== id));
    }

    return (
        <div className="list">
            <h2>Acomodações</h2>
            <div className="list-itens">
                {acomodacoes.map(a => {
                    return (
                        <Acomodacao2
                            acomodacao={a}
                            key={a.id}
                            delete={deletarAcomodacao}
                        ></Acomodacao2>
                    );
                })}
            </div>
        </div>
    );
}