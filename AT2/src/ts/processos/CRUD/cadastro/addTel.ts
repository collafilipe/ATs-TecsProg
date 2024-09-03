import Processo from "../../../abstracoes/processo";
import buscarClienteDocumento from "../../buscar/buscarClienteDocumento";
import Armazem from "../../../dominio/armazem";
import CadastrarTelefonesCliente from "./cadastroTel";import Telefone from "../../../modelos/telefone";

export default class CadastroTelefone extends Processo {
    processar(): void {
        console.log('Iniciando o cadastro de um novo telefone...')
        let numero = this.entrada.receberTexto('Qual o número do telefone?')
        let armazem = Armazem.InstanciaUnica
        let cliente = buscarClienteDocumento(armazem.Clientes, numero)
        if (cliente != undefined) {
            this.processo = new CadastrarTelefonesCliente(cliente)
            this.processo.processar()
    } else {
        console.log('Cliente não encontrado')
    }
}
}