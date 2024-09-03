import Processo from "../../../abstracoes/processo";
import buscarClienteDocumento from "../../buscar/buscarClienteDocumento";
import Armazem from "../../../dominio/armazem";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";

export default class AddDoc extends Processo {
    processar(): void {
        let doc = this.entrada.receberTexto('Qual o número do documento?')
        let armazem = Armazem.InstanciaUnica
        let cliente = buscarClienteDocumento(armazem.Clientes, doc)

        if (cliente == undefined) {
            console.log('Cliente não encontrado')
            return
        } else {
            this.processo = new CadastrarDocumentosCliente(cliente)
            this.processo.processar()
        }
}
}