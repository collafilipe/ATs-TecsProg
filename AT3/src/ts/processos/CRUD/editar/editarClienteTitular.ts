import Processo from "../../../abstracoes/processo";
import Armazem from "../../../dominio/armazem";
import MenuEditarCliente from "../../../menus/menuEditarCliente";
import Cliente from "../../../modelos/cliente";
import Documento from "../../../modelos/documento";
import Endereco from "../../../modelos/endereco";
import Telefone from "../../../modelos/telefone";
import CadastrarAcomodacaoCliente from "../Cadastro/cadastroAcomocacaoCliente";

export default class EditarClienteTitular extends Processo {
    private clientes: Cliente[]
    constructor() {
        super()
        this.menu = new MenuEditarCliente()
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }

    processar(): void {
        console.clear()
        var processo = false
        let cliente = this.entrada.receberTexto('| Insira o número do documento do cliente a ser editado:')

        for (let index = 0; index < this.clientes.length; index++) {
            for (let indexDoc = 0; indexDoc < this.clientes[index].Documentos.length; indexDoc++) {
                if (cliente == this.clientes[index].Documentos[indexDoc].Numero) {
                    processo = true

                    this.menu.mostrar()
                    this.opcao = this.entrada.receberNumero('Qual a opção desejada?')
                    switch (this.opcao) {
                        case 1:
                            let novoNome = this.entrada.receberTexto('| Insira o novo nome do cliente: ')
                            this.clientes[index].Nome = novoNome;
                            break;
                        case 2:
                            let novoNomeSocial = this.entrada.receberTexto('| Insira o novo nome social do cliente: ')
                            this.clientes[index].NomeSocial = novoNomeSocial;
                            break;
                        case 3:
                            let novaRua = this.entrada.receberTexto('| Insira a nova rua: ')
                            let novoBairro = this.entrada.receberTexto('| Insira o novo bairro: ')
                            let novaCidade = this.entrada.receberTexto('| Insira a nova cidade: ')
                            let novoEstado = this.entrada.receberTexto('| Insira o novo estado: ')
                            let novoPais = this.entrada.receberTexto('| Insira o novo país: ')
                            let novoCodigoPostal = this.entrada.receberTexto('| Insira o novo código postal: ')
                            let endereco = new Endereco(novaRua, novoBairro, novaCidade, novoEstado, novoPais, novoCodigoPostal)
                            this.clientes[index].Endereco = endereco
                            break;
                        case 4:
                            for (let indexTel = 0; indexTel < this.clientes[index].Telefones.length; indexTel++) {
                                console.log(`| ${indexTel} - (${this.clientes[index].Telefones[indexTel].Ddd}) ${this.clientes[index].Telefones[indexTel].Numero}`);
                            }

                            let opcaoTel = this.entrada.receberNumero('| Insira a opção a ser editada: ')

                            for (let indexTelOpc = 0; indexTelOpc < this.clientes[index].Telefones.length; indexTelOpc++) {
                                if (opcaoTel == indexTelOpc) {
                                    let novoDdd = this.entrada.receberTexto('| Insira o novo DDD: ')
                                    let novoNumero = this.entrada.receberTexto('| Insira o novo numero: ')
                                    let telefone = new Telefone(novoDdd, novoNumero)

                                    this.clientes[index].Telefones[indexTelOpc] = telefone
                                }
                            }
                            break;
                        case 5:
                            for (let indexDoc = 0; indexDoc < this.clientes[index].Documentos.length; indexDoc++) {
                                console.log(`| ${indexDoc} - (${this.clientes[index].Documentos[indexDoc].Tipo}): ${this.clientes[index].Documentos[indexDoc].Numero}`);
                            }

                            let opcaoDoc = this.entrada.receberNumero('| Insira a opção a ser editada: ')

                            for (let indexDocOpc = 0; indexDocOpc < this.clientes[index].Documentos.length; indexDocOpc++) {
                                if (opcaoDoc == indexDocOpc) {
                                    let novoNumero = this.entrada.receberTexto('| Insira o novo numero: ')
                                    let novaDataExpedicao = this.entrada.receberData('| Qual a data de expedição do documento?')
                                    let documento = new Documento(novoNumero, this.clientes[index].Documentos[indexDoc].Tipo, novaDataExpedicao)

                                    this.clientes[index].Documentos[indexDocOpc] = documento
                                }
                            }
                            break;
                        case 6: 
                            let cadastrados = new CadastrarAcomodacaoCliente(this.clientes[index])
                            this.processo.processar()
                        case 0:
                            console.log("Até mais!");
                            break;
                        default:
                            console.log('Opção não entendida... :(')
                    }
                }
            }
        }

        if (processo != true) {
            console.log('\nCliente não encontrado :(')
        }
    }
}