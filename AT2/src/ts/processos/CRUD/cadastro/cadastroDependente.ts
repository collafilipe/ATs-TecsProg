import Processo from "../../../abstracoes/processo";
import buscarClienteDocumento from "../../buscar/buscarClienteDocumento";
import Armazem from "../../../dominio/armazem";
import Cliente from "../../../modelos/cliente";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";

export default class CadastroClienteTitular extends Processo {
    processar(): void {
        let doc = this.entrada.receberTexto('Qual o número do documento?')
        let armazem = Armazem.InstanciaUnica
        let cliente = buscarClienteDocumento(armazem.Clientes, doc)
        if (cliente == undefined) {
            console.log('Cliente não encontrado')
            return
        } else {
            let nome = this.entrada.receberTexto('Qual o nome do novo cliente?')
            let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo cliente?')
            let dataNascimento = this.entrada.receberData('Qual a data de nascimento?')
            let novoCliente = new Cliente(nome, nomeSocial, dataNascimento)

            this.processo = new CadastroEnderecoTitular(novoCliente)
            this.processo.processar()

            this.processo = new CadastrarDocumentosCliente(novoCliente)
            this.processo.processar()

            cliente.setTitular(novoCliente)
            cliente.addDependente(novoCliente)

            let armazem = Armazem.InstanciaUnica
            armazem.Clientes.push(novoCliente)

            console.log('Finalizando o cadastro do cliente...')
}
    }

}