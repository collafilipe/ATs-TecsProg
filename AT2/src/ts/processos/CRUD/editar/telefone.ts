import Processo from "../../../abstracoes/processo";
import Impressor from "../../../interfaces/impressor";
import Cliente from "../../../modelos/cliente";
import Telefone from "../../../modelos/telefone";
import ImpressaorTelefone from "../../../impressores/impressorTelefone";

export default class EdicaoTelefones extends Processo {
    private clienteEditado: Cliente
    private impressor!: Impressor
    private telefones: Telefone[] = []
    constructor(clienteEditado:Cliente) {
        super()
        this.clienteEditado = clienteEditado
    }
    processar(): void {
        this.clienteEditado.Telefones.forEach(telefone => {
            this.impressor = new ImpressaorTelefone(telefone)
            console.log(this.impressor.imprimir())
            let edicao = this.entrada.receberTexto("Deseja editar este número? (S/N)").toUpperCase()
            if (edicao == "S") {
                let ddd = this.entrada.receberTexto('Qual o DDD do telefone?')
                let numero = this.entrada.receberTexto('Qual o número do telefone?')
                let tel = new Telefone(ddd,numero)
                this.telefones.push(tel)
            } else {
                this.telefones.push(telefone)
            }
        })
        this.clienteEditado.setTelefones(this.telefones)
    }

}