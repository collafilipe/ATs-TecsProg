import Processo from "../../../abstracoes/processo";
import Cliente from "../../../modelos/cliente";
import Telefone from "../../../modelos/telefone";

export default class CadastroTelefone extends Processo {
    private cliente: Cliente

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        console.log('Coletando os dados de telefone...')

        let quantidade = this.entrada.receberNumero('| Quantos telefones serão cadastrados?')

        for (let index = 0; index < quantidade; index++) {
            let ddd = this.entrada.receberTexto('| Qual o DDD?')
            let numero = this.entrada.receberTexto('| Qual o número?')
            let telefone = new Telefone(ddd, numero)

            this.cliente.Telefones.push(telefone)

            console.log(`----------------------`)
        }
    }
}