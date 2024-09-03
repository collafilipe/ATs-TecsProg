import Processo from "../../../abstracoes/processo";
import Cliente from "../../../modelos/cliente";
import Telefone from "../../../modelos/telefone";

export default class CadastrarTelefonesCliente extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.execucao = true
    }

    processar(): void {
        console.log('Inciando o cadastro de telefones...')
        while (this.execucao) {
            let telefone = this.entrada.receberTexto('Qual o número do telefone?')
            let ddd = this.entrada.receberTexto('Qual o DDD?')
            let telefoneObj = new Telefone(ddd, telefone)
            this.cliente.Telefones.push(telefoneObj)
            let opcao = this.entrada.receberTexto('Deseja cadastrar mais telefones? (s/n)')
            if (opcao === 'n') {
                this.execucao = false
            }
        }
    }
}