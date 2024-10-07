import { Link, useLocation } from 'react-router-dom';
import './navbar.css'

export default function Navbar() {
    const currentPath = useLocation().pathname;

    return (
        <nav>
        <Link to="/"><h2>Atlantis</h2></Link>
            <ul>
                <li>
                    <Link to="/clientes" className={currentPath === '/clientes' ? 'active' : ''}>Clientes</Link>
                </li>
                <li>
                    <Link to="/acomodacoes" className={currentPath === '/acomodacoes' ? 'active' : ''}>Acomodações</Link>
                </li>
                <li>
                    <Link to="/cadastrar" className={currentPath === '/cadastro' ? 'active' : ''}>Cadastrar</Link>
                </li>
            </ul>
        </nav>
    );
}