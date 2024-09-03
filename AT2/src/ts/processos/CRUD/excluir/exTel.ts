import Processo from "../../../abstracoes/processo";
import buscarClienteDocumento from "../../buscar/buscarClienteDocumento";
import Armazem from "../../../dominio/armazem";
import ImpressaorTelefone from "../../../impressores/impressorTelefone";
import Impressor from "../../../interfaces/impressor";
import Cliente from "../../../modelos/cliente";
import Telefone from "../../../modelos/telefone";

export default class ExclusaoTelefone extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }
    processar(): void {

        console.log('Iniciando a exclusão de um Documento...')
        let documento = this.entrada.receberTexto(`Insira o número do documento do cliente`)
        let cliente = buscarClienteDocumento(this.clientes, documento)
        if (cliente != null) {
            if (cliente.Telefones.length <= 1){
                console.log("Não é possível excluir um telefone.");
                console.log("Todo cliente precisa de ao menos um telefone!");
                return
            }
            let excluindo = true
            while(excluindo){
                let telefones:Telefone[] = []
                cliente.Telefones.forEach(telefone => {
                    this.impressor = new ImpressaorTelefone(telefone)
                    console.log(this.impressor.imprimir())
                    let edicao = this.entrada.receberTexto("Deseja excluir este telefone? (S/N)").toUpperCase()
                    if (edicao != "S") {
                        telefones.push(telefone)
                    }
                })
                if (telefones.length > 0) {
                    cliente.setTelefones(telefones)
                    return
                } else {
                    console.log("O cliente precisa de ao menos um telefone, tente novamente!");
                }
            }
        } else {
            console.log("Cliente não encontrado, tente novamente! ");
            return
        }
    }
}