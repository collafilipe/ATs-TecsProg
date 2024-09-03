import Processo from "../../../abstracoes/processo";
import Cliente from "../../../modelos/cliente";
import Impressor from "../../../interfaces/impressor";
import ImpressorDocumento from "../../../impressores/impressorDocumento";

export default class EdicaoDoc extends Processo {
    private clienteEditado: Cliente
    private impressor!: Impressor
    constructor(clienteEditado:Cliente) {
        super()
        this.clienteEditado = clienteEditado
    }

    processar(): void {
        this.clienteEditado.Documentos.forEach(documento => {
            this.impressor = new ImpressorDocumento(documento)
            console.log(this.impressor.imprimir());
            let edicao = this.entrada.receberTexto("Deseja editar este documento? (S/N)").toUpperCase()
            if (edicao == "S") {
                let numero = this.entrada.receberTexto('Qual o número do documento?')
                let dataExpedicao = this.entrada.receberData('Qual a data de expedição do documento?')
                documento.setNumero(numero)
                documento.setDataExpedicao(dataExpedicao)
            }
        })
}
}
