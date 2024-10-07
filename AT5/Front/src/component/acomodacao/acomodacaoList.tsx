import { useEffect, useState } from "react";
import { Acomodacao } from "../../type/acomodacaoInterface";
import Acomodacao2 from "./acomodacao";

export default function AcomodacoesList() {
    const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([]);

    useEffect(() => {
        fetch("http://localhost:5555/acomodacoes/acomodacoes") // Certifique-se de que o endpoint está correto
            .then((res) => res.json())
            .then((data) => {
                // Atualiza o estado com a lista de acomodações (array completo)
                if (data && Array.isArray(data)) {
                    setAcomodacoes(data); // Verifica se "data" é um array antes de setar
                }
            })
            .catch((error) => {
                console.error("Erro ao buscar acomodações:", error);
            });
    }, []);

    return (
        <div className="list">
            <h2>Acomodações</h2>
            <div className="list-itens">
                {acomodacoes.length > 0 ? (
                    acomodacoes.map((a) => (
                        <Acomodacao2
                            acomodacao={a} // Passa todo o objeto de acomodação
                            key={a.acomodacaoID} // Usar o ID da acomodação como chave única
                            quartos={[]} clientes={[]}                        />
                    ))
                ) : (
                    <p>Nenhuma acomodação disponível.</p>
                )}
            </div>
        </div>
    );
}
