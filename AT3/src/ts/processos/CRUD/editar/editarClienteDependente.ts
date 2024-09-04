import Processo from "../../../abstracoes/processo";
import Armazem from "../../../dominio/armazem";
import MenuEditarClienteDependente from "../../../menus/menuEditarClienteDependente";
import Cliente from "../../../modelos/cliente";
import Documento from "../../../modelos/documento";

export default class EditarClienteDependente extends Processo {
    private clientes: Cliente[]
    constructor() {
        super()
        this.menu = new MenuEditarClienteDependente()
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }

    processar(): void {
        console.clear()
        var processo = false
        let dependente = this.entrada.receberTexto('| Insira o número do documento do cliente dependente a ser editado:')

        for (let index = 0; index < this.clientes.length; index++) {
            for (let indexDep = 0; indexDep < this.clientes[index].Dependentes.length; indexDep++) {
                for (let indexDoc = 0; indexDoc < this.clientes[index].Dependentes[indexDep].Documentos.length; indexDoc++) {
                    if (dependente == this.clientes[index].Dependentes[indexDep].Documentos[indexDoc].Numero) {
                        processo = true

                        this.menu.mostrar()
                        this.opcao = this.entrada.receberNumero('Qual a opção desejada?')
                        switch (this.opcao) {
                            case 1:
                                let novoNomeDep = this.entrada.receberTexto('| Insira o novo nome do cliente: ')
                                this.clientes[index].Dependentes[indexDep].Nome = novoNomeDep;
                                break;
                            case 2:
                                let novoNomeSocialDep = this.entrada.receberTexto('| Insira o novo nome social do cliente: ')
                                this.clientes[index].Dependentes[indexDep].NomeSocial = novoNomeSocialDep;
                                break;
                            case 3:
                                for (let indexDoc = 0; indexDoc < this.clientes[index].Dependentes[indexDep].Documentos.length; indexDoc++) {
                                    console.log(`| ${indexDoc} - (${this.clientes[index].Dependentes[indexDep].Documentos[indexDoc].Tipo}): ${this.clientes[index].Dependentes[indexDep].Documentos[indexDoc].Numero}`);
                                }

                                let opcaoDoc = this.entrada.receberNumero('| Insira a opção a ser editada: ')

                                for (let indexDocOpc = 0; indexDocOpc < this.clientes[index].Dependentes[indexDep].Documentos.length; indexDocOpc++) {
                                    if (opcaoDoc == indexDocOpc) {
                                        let novoNumero = this.entrada.receberTexto('| Insira o novo numero: ')
                                        let novaDataExpedicao = this.entrada.receberData('| Qual a data de expedição do documento?')
                                        let documentoDep = new Documento(novoNumero, this.clientes[index].Dependentes[indexDep].Documentos[indexDoc].Tipo, novaDataExpedicao)

                                        this.clientes[index].Dependentes[indexDep].Documentos[indexDocOpc] = documentoDep
                                    }
                                }
                                break;
                            case 0:
                                console.log("Até mais!");
                                break;
                            default:
                                console.log('Opção não entendida... :(')
                        }
                    }
                }
            }
        }

        if (processo != true) {
            console.log('\nCliente não encontrado :(')
        }
    }
}