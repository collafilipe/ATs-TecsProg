import Processo from "../../../abstracoes/processo";
import buscarClienteDocumento from "../../buscar/buscarClienteDocumento";
import Armazem from "../../../dominio/armazem";
import Cliente from "../../../modelos/cliente";
import ImpressaorCliente from "../../../impressores/impressorCliente";
import Impressor from "../../../interfaces/impressor";
import ImpressorEndereco from "../../../impressores/impressorEndereco";
import EdicaoTelefones from "./telefone";
import EdicaoEndereco from "./endereco";
import EdicaoDoc from "./doc";

export default class EdicaoCliente extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }
    processar(): void {
        console.log('Iniciando a edição de um cliente...')
        let documento = this.entrada.receberTexto(`Insira o número do documento do cliente`)

        let cliente = buscarClienteDocumento(this.clientes, documento)
        if (cliente != null) {
            this.impressor = new ImpressaorCliente(cliente)
            console.log(this.impressor.imprimir())
        } else {
            console.log("Cliente não encontrado, tente novamente! ");
            return
        }

        let nome = this.entrada.receberTexto('Qual o nome do cliente? ')
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do cliente?')
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?')
        cliente.setNome(nome)
        cliente.setNomeSocial(nomeSocial)
        cliente.setDataNascimento(dataNascimento)

        this.impressor = new ImpressorEndereco(cliente.Endereco)
        console.log(this.impressor.imprimir())
        let resposta = this.entrada.receberTexto("Deseja alterar esse endereco? (S/N)")
        if (resposta == "S") {
            this.processo = new EdicaoEndereco(cliente)
            this.processo.processar()
        }

        this.processo = new EdicaoTelefones(cliente)
        this.processo.processar()

        this.processo = new EdicaoDoc(cliente)
        this.processo.processar()


        console.log('Finalizando o cadastro do cliente...')
    }
}