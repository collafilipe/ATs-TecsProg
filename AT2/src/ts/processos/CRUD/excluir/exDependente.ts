import Processo from "../../../abstracoes/processo";
import Armazem from "../../../dominio/armazem";
import Cliente from "../../../modelos/cliente";

export default class ExclusaoClienteDependente extends Processo {
    private clientes: Cliente[]
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }

    processar(): void {
        console.clear()
        var processo = false
        let dependente = this.entrada.receberTexto('Insira o número do documento do cliente dependente a ser excluído:')
        for (let index = 0; index < this.clientes.length; index++) {
            for (let indexDependente = 0; indexDependente < this.clientes[index].Dependentes.length; indexDependente++) {
                for (let indexDoc = 0; indexDoc < this.clientes[index].Dependentes[indexDependente].Documentos.length; indexDoc++) {
                    if (dependente == this.clientes[index].Dependentes[indexDependente].Documentos[indexDoc].Numero) {
                        processo = true
                        this.clientes[index].Dependentes.splice(index, 1)
                        console.log('Cliente excluído com sucesso.');
                        break;
                    }
                }
            }
        }
        if (processo != true) {
            console.log('\nCliente não encontrado :(')
        }
    }
}