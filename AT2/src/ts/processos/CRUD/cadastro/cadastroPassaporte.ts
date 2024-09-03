import Processo from "../../../abstracoes/processo";
import VerificarDocumento from "../../buscar/verificarDocumento";
import Armazem from "../../../dominio/armazem";
import { TipoDocumento } from "../../../enumeracoes/TipoDocumento";
import Cliente from "../../../modelos/cliente";
import Documento from "../../../modelos/documento";

export default class CadastroPassaporte extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        console.log('Iniciando o cadastro de um novo passaporte...')
        let clientes = Armazem.InstanciaUnica.Clientes
        let numero = this.entrada.receberTexto('Qual o número do passaporte?')
        let dataExpedicao = this.entrada.receberData('Qual a data de expedição do passaporte?')
        let verificacao = VerificarDocumento(clientes, numero)
        if (verificacao === undefined) {
            let passaporte = new Documento(numero, TipoDocumento.Passaporte, dataExpedicao)
            this.cliente.Documentos.push(passaporte)
        } else {
            console.log('Documento já cadastrado')
        }
    }
}