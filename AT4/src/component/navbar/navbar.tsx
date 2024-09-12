import { Link, useLocation } from 'react-router-dom';
import './navbar.css'

export default function Navbar() {
    const currentPath = useLocation().pathname;

    return (
        <nav>
        <Link to="/"><h2>Atlantis</h2></Link>
            <ul>
                <li>
                    <Link to="/clientes" className={currentPath === '/clientes' ? 'active' : ''}>Home</Link>
                </li>
                <li>
                    <Link to="/acomodacoes" className={currentPath === '/acomodacoes' ? 'active' : ''}>About</Link>
                </li>
                <li>
                    <Link to="/cadastrar" className={currentPath === '/cadastro' ? 'active' : ''}>Contact</Link>
                </li>
            </ul>
        </nav>
    );
}