import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";
import ImpressorAcomodacao from "./impressorAcomodacao";
import ImpressorDocumentos from "./impressorDocumentos";
import ImpressorEndereco from "./impressorEndereco";
import ImpressorTelefones from "./impressorTelefones";

export default class ImpressorCliente implements Impressor {
    private cliente: Cliente

    private impressor!: Impressor

    constructor(cliente: Cliente) {
        this.cliente = cliente
    }

    imprimir(): string {
        let impressao = `****************************\n`
            + `| Nome: ${this.cliente.Nome}\n`
            + `| Nome social: ${this.cliente.NomeSocial}\n`
            + `| Data de nascimento: ${this.cliente.DataNascimento.toLocaleDateString()}\n`
            + `| Data de cadastro: ${this.cliente.DataCadastro.toLocaleDateString()}\n`

        this.impressor = new ImpressorEndereco(this.cliente.Endereco)
        impressao = impressao + `\n${this.impressor.imprimir()}\n`

        for (let index = 0; index < this.cliente.Telefones.length; index++) {
            this.impressor = new ImpressorTelefones(this.cliente.Telefones[index])
            impressao = impressao + `\n${this.impressor.imprimir()}\n`
        }

        this.impressor = new ImpressorDocumentos(this.cliente.Documentos)
        impressao = impressao + `\n${this.impressor.imprimir()}\n`

        this.impressor = new ImpressorAcomodacao(this.cliente.Acomodacao);
        impressao = impressao + `\n${this.impressor.imprimir()}`;

        impressao = impressao + `\n****************************\n`
        return impressao
    }
}