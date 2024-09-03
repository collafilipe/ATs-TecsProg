import Processo from "../../../abstracoes/processo";
import MenuTipoCadastroCliente from "../../../menus/cadastro/menuTipoCadastroCliente";
import CadastroClienteTitular from "./cadastroClienteTitular";
import cadastroDependete from "./cadastroDependente";
import AddDoc from "./addDoc";
import addTel from "./addTel";

export default class TipoCadastroCliente extends Processo {
    constructor() {
        super()
        this.menu = new MenuTipoCadastroCliente()
    }
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual opção desejada?')
        
        switch (this.opcao) {
            case 1:
                this.processo = new CadastroClienteTitular()
                this.processo.processar()
                break
            case 2:
                this.processo = new cadastroDependete()
                this.processo.processar()
                break
            case 3:
                this.processo = new addTel()
                this.processo.processar()
                break
            case 4:
                this.processo = new AddDoc()
                this.processo.processar()
                break
            default:
                console.log('Opção não entendida :(')
        }
    }
}