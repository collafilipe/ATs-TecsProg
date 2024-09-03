import Processo from "../../../abstracoes/processo";
import Armazem from "../../../dominio/armazem";
import Cliente from "../../../modelos/cliente";

export default class ExclusaoClienteTitular extends Processo {
    private clientes: Cliente[]
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }
    processar(): void {
        console.log('Iniciando a exclusão de um cliente...')
        var processo = false
        let cliente = this.entrada.receberTexto('Insira o número do documento do cliente a ser excluído:')
        for (let index = 0; index < this.clientes.length; index++) {
            for (let indexDoc = 0; indexDoc < this.clientes[index].Documentos.length; indexDoc++) {
                if (cliente == this.clientes[index].Documentos[indexDoc].Numero) {
                    if (this.clientes[index].Dependentes.length > 0){
                        for (let indexDependente = 0; indexDependente < this.clientes[index].Dependentes.length; indexDependente++) {
                            let dependente = this.clientes[index].Dependentes[indexDependente];
                            dependente.setTitular(null)
                        }
                    }
                    processo = true
                    this.clientes.splice(index, 1)
                    console.log('Cliente excluído com sucesso.');
                    break;
                }
            }
        }
        if (processo != true) {
            console.log('\nCliente não encontrado :(')
        }
    }
}