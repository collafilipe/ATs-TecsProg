import Processo from "../../../abstracoes/processo";
import buscarClienteDocumento from "../../buscar/buscarClienteDocumento";
import Armazem from "../../../dominio/armazem";
import ImpressaorCliente from "../../../impressores/impressorCliente";
import Impressor from "../../../interfaces/impressor";

export default class ListagemTitularDoDependente extends Processo {
    private impressor!: Impressor

    processar(): void {
        console.clear()
        console.log('Iniciando a listagem...')
        let documento = this.entrada.receberTexto('Insira o documento do cliente dependente: ')
        let armazem = Armazem.InstanciaUnica
        let cliente = buscarClienteDocumento(armazem.Clientes, documento)
        if (cliente != null && cliente.Titular != undefined) {
            if (cliente.Titular){
                this.impressor = new ImpressaorCliente(cliente.Titular)
                console.log(`\n Este é o titular deste cliente: \n`);
                console.log(this.impressor.imprimir())
            } else {
                console.log(`Este cliente não possui um titular`);
            }
        } else {
            console.log("Cliente não encontrado, tente novamente! ");
        }
    }
}