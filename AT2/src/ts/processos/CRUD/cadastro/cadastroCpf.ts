import Processo from "../../../abstracoes/processo";
import VerificarDocumento from "../../buscar/verificarDocumento";
import Armazem from "../../../dominio/armazem";
import { TipoDocumento } from "../../../enumeracoes/TipoDocumento";
import Cliente from "../../../modelos/cliente";
import documento from "../../../modelos/documento";
import Documento from "../../../modelos/documento";

export default class CadastroCpf extends Processo {

    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        let clientes = Armazem.InstanciaUnica.Clientes
        let cpf = this.entrada.receberTexto('Qual o número do CPF?')
        let dataExpedicao = this.entrada.receberData('Qual a data de expedição do documento?')
        let verificacao = VerificarDocumento(clientes, cpf)
        if (verificacao == undefined) {
            let cpf2 = new Documento(cpf, TipoDocumento.CPF, dataExpedicao)
            this.cliente.Documentos.push(cpf2)
        } else {
            console.log('CPF já cadastrado')
        }
    }
}