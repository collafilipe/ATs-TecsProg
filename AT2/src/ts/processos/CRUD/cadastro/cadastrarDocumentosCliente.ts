import Processo from "../../../abstracoes/processo";
import MenuTipoDocumento from "../../../menus/cadastro/menuTipoDocumento";
import Cliente from "../../../modelos/cliente";
import CadastroRg from "./cadastroRg";
import CadastroPassaporte from "./cadastroPassaporte";
import CadastroCpf from "./cadastroCpf";

export default class CadastrarDocumentosCliente extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.menu = new MenuTipoDocumento()
        this.execucao = true
    }

    processar(): void {
        console.log('Inciando o cadastro de documentos...')
        while (this.execucao) {
            this.menu.mostrar()
            this.opcao = this.entrada.receberNumero('Qual opção desejada?')
            switch (this.opcao) {
                case 1:
                    this.processo = new CadastroCpf(this.cliente)
                    this.processo.processar()
                    break
                case 2:
                    this.processo = new CadastroRg(this.cliente)
                    this.processo.processar()
                    break
                case 3:
                    this.processo = new CadastroPassaporte(this.cliente)
                    this.processo.processar()
                    break
                case 0:
                    if (this.cliente.Documentos.length === 0) {
                        console.log('O cliente precisa ter pelo menos um documento cadastrado')
                    } else {
                        this.execucao = false
                    }
                default:
                    console.log('Opção não entendida :(')
            }
        }
    }
}