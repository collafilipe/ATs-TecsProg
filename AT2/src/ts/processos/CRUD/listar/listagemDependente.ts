import Processo from "../../../abstracoes/processo";
import buscarClienteDocumento from "../../buscar/buscarClienteDocumento";
import Armazem from "../../../dominio/armazem";
import ImpressaorCliente from "../../../impressores/impressorCliente";
import Impressor from "../../../interfaces/impressor";

export default class ListagemDependentesDoTitular extends Processo {
    private impressor!: Impressor

    processar(): void {
        console.clear()
        console.log('Iniciando a listagem dos dependentes...')
        let documento = this.entrada.receberTexto('Insira o documento do cliente titular: ')
        let armazem = Armazem.InstanciaUnica

        let titular = buscarClienteDocumento(armazem.Clientes, documento)
        if (titular != undefined) {
            if (titular.Dependentes.length == 0){
                console.log("Este cliente não possui dependentes");
            } else {
                titular.Dependentes.forEach(dependente => {
                    this.impressor = new ImpressaorCliente(dependente)
                    console.log(this.impressor.imprimir())
                })
            }
        } else {
            console.log("Cliente não encontrado! ");
        }
    }
}