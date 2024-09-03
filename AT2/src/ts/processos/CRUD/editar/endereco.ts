import Processo from "../../../abstracoes/processo";
import ImpressorEndereco from "../../../impressores/impressorEndereco";
import Impressor from "../../../interfaces/impressor";
import Cliente from "../../../modelos/cliente";
import Endereco from "../../../modelos/endereco";

export default class EdicaoEndereco extends Processo {
    private clienteEditado: Cliente
    private impressor!: Impressor
    constructor(clienteEditado:Cliente) {
        super()
        this.clienteEditado = clienteEditado
    }

    processar(): void {
        let endereco = this.clienteEditado.Endereco
        this.impressor = new ImpressorEndereco(endereco)
        console.log(this.impressor.imprimir())
        let edicao = this.entrada.receberTexto("Deseja editar este endereço? (S/N)").toUpperCase()
        if (edicao == "S") {
            let rua = this.entrada.receberTexto('Qual a rua?')
            let bairro = this.entrada.receberTexto('Qual o bairro?')
            let cidade = this.entrada.receberTexto('Qual a cidade?')
            let estado = this.entrada.receberTexto('Qual o estado?')
            let pais = this.entrada.receberTexto('Qual o país?')
            let cep = this.entrada.receberTexto('Qual o CEP?')

            endereco = new Endereco(rua, bairro, cidade, estado, pais, cep)
            this.clienteEditado.setEndereco(endereco)
        }
    }
}