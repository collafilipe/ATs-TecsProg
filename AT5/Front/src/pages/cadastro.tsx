import { Link } from "react-router-dom"
import './pages.css'

function CadastroPage() {
    return(
        <>
            <h1 className="cadastro-title">O que deseja cadastrar?</h1>
            <div className="opcoes-cadastro">
                <Link className="button" to={'/cadastrarCliente'}>Clientes</Link>
                <Link className="button" to={'/cadastrarAcomodacao'}>Acomodações</Link>
            </div>
        </>
    )
}

export default CadastroPage