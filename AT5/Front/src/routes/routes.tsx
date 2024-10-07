import { Route, BrowserRouter, Routes as Switch } from 'react-router-dom';
import Navbar from '../component/navbar/navbar';
import CadastroPage from '../pages/cadastro';
import CadastrarCliente from '../component/cliente/clienteCadastro';
import AcomodacaoCadastro from '../component/acomodacao/acomodacaoCadastro';
import ClientesList from '../component/cliente/clienteList';
import AcomodacaoList from '../component/acomodacao/acomodacaoList';

export default function Routes() {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route path="/" element={<ClientesList />}/>
                <Route path="/clientes" element={<ClientesList />}/>
                <Route path="/acomodacoes" element={<AcomodacaoList />}/>
                <Route path="/cadastrar" element={<CadastroPage />}/>
                <Route path="/cadastrarCliente" element={<CadastrarCliente />}/>
                <Route path="/cadastrarAcomodacao" element={<AcomodacaoCadastro />}/>
            </Switch>
        </BrowserRouter>
    );
}