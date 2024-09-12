import { SetStateAction, useState } from "react";
import './acomodacao.css'

export default function AcomodacaoCadastro() {
    
    const [quarto, setQuarto] = useState('')
    const [secaoForm, setSecaoForm] = useState('Informações Básicas');
    const [idTitular, setIdTitular] = useState('')
    const [idAcomodacao, setIdAcomodacao] = useState('')
    const [tipoAcomodacao, setTipoAcomodacao] = useState('Casal Simples')

    const cadastrar = () => {
        setQuarto('')
    }

    function changeSecao(valor: string) {
        setSecaoForm(valor)
    }

    return (
        <div className="form-cadastro">
            <h2>Cadastrar Acomodação</h2>

            <form>
            <div className="cliente-select">
                <label htmlFor="Acomodacao">Tipo de Acomodação:</label>
                <select value={tipoAcomodacao} onChange={e => setTipoAcomodacao(e.target.value)}>
                <option value={"Casal Simples"}>Casal Simples</option>
                <option value={"Familia Simples"}>Familia Simples</option>
                <option value={"Familia Mais"}>Familia Mais</option>
                <option value={"Familia Super"}>Familia Super</option>
                <option value={"Solteiro Simples"}>Solteiro Simples</option>
                <option value={"Solteiro Mais"}>Solteiro Mais</option>
                </select>
            </div>
            <div className='seletor-secao'>
                <div className={secaoForm === 'Informações Básicas' ? 'secao-ativa' : ''} onClick={() => changeSecao('Informações Básicas')}>Informações</div>
            </div>
            {secaoForm === 'Informações Básicas' &&
                <div>
                <div className="input-group mb-3">
                    <input type="text"
                    value={idAcomodacao} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setIdAcomodacao(e.target.value)}
                    placeholder="Id Acomodação *" aria-label="Id Acomodação" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <input type="text"
                    value={quarto} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setQuarto(e.target.value)}
                    placeholder="Quarto *" aria-label="Quarto" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <input type="text"
                    value={idTitular} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setIdTitular(e.target.value)}
                    placeholder="Id Cliente" aria-label="Id Cliente" aria-describedby="basic-addon1" />
                </div>
                </div>
            }
            {secaoForm === 'Titular' &&
                <div>
                <div className="input-group mb-3">
                    <input type="text"
                    value={idTitular} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setIdAcomodacao(e.target.value)}
                    placeholder="ID Acomodacao *" aria-label="Acomodacao" aria-describedby="basic-addon1" />
                </div>
                </div>
            }
            <div>
                <div className="button save" onClick={cadastrar}>Cadastrar Acomodação</div>
            </div>
            </form>
        </div>
    )
}