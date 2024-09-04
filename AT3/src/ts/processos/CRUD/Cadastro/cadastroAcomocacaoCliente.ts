import Armazem from "../../../dominio/armazem";
import Processo from "../../../abstracoes/processo";
import Acomodacao from "../../../modelos/acomodacao";
import Cliente from "../../../modelos/cliente";
import MenuTipoAcomodacao from "../../../menus/menuTipoAcomocacao";
import Impressor from "../../../interfaces/impressor";
import ListagemAcomodacoes from "../../listar/listagemAcomodacoes";

export default class CadastrarAcomodacaoCliente extends Processo {
    private acomodacoes: Acomodacao[]
    private cliente: Cliente
    private impressor!: Impressor

    constructor(cliente: Cliente) {
        super()
        this.menu = new MenuTipoAcomodacao()
        this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes
        this.cliente = cliente
        this.execucao = true
    }

    processar(): void {
        console.log('Inciando o cadastro de acomodações...')

        this.menu.mostrar();

        let opcao = this.entrada.receberNumero("Digite a acomodação desejada: ");

        this.processo = new ListagemAcomodacoes()
        this.processo.processar()

        switch (opcao) {
            case 1:
                let acomodacao = new Acomodacao(
                    this.acomodacoes[0].NomeAcomadacao,
                    this.acomodacoes[0].CamaSolteiro,
                    this.acomodacoes[0].CamaCasal,
                    this.acomodacoes[0].Suite,
                    this.acomodacoes[0].Climatizacao,
                    this.acomodacoes[0].Garagem
                );

                this.cliente.Acomodacao = acomodacao
                break

            case 2:
                let acomodacao1 = new Acomodacao(
                    this.acomodacoes[1].NomeAcomadacao,
                    this.acomodacoes[1].CamaSolteiro,
                    this.acomodacoes[1].CamaCasal,
                    this.acomodacoes[1].Suite,
                    this.acomodacoes[1].Climatizacao,
                    this.acomodacoes[1].Garagem
                );

                this.cliente.Acomodacao = acomodacao1
                break

            case 3:
                let acomodacao2 = new Acomodacao(
                    this.acomodacoes[2].NomeAcomadacao,
                    this.acomodacoes[2].CamaSolteiro,
                    this.acomodacoes[2].CamaCasal,
                    this.acomodacoes[2].Suite,
                    this.acomodacoes[2].Climatizacao,
                    this.acomodacoes[2].Garagem
                );

                this.cliente.Acomodacao = acomodacao2
                break

            case 4:
                let acomodacao3 = new Acomodacao(
                    this.acomodacoes[3].NomeAcomadacao,
                    this.acomodacoes[3].CamaSolteiro,
                    this.acomodacoes[3].CamaCasal,
                    this.acomodacoes[3].Suite,
                    this.acomodacoes[3].Climatizacao,
                    this.acomodacoes[3].Garagem
                );

                this.cliente.Acomodacao = acomodacao3
                break

            case 5:
                let acomodacao4 = new Acomodacao(
                    this.acomodacoes[4].NomeAcomadacao,
                    this.acomodacoes[4].CamaSolteiro,
                    this.acomodacoes[4].CamaCasal,
                    this.acomodacoes[4].Suite,
                    this.acomodacoes[4].Climatizacao,
                    this.acomodacoes[4].Garagem
                );

                this.cliente.Acomodacao = acomodacao4
                break

            case 6:
                let acomodacao5 = new Acomodacao(
                    this.acomodacoes[5].NomeAcomadacao,
                    this.acomodacoes[5].CamaSolteiro,
                    this.acomodacoes[5].CamaCasal,
                    this.acomodacoes[5].Suite,
                    this.acomodacoes[5].Climatizacao,
                    this.acomodacoes[5].Garagem
                );

                this.cliente.Acomodacao = acomodacao5
                break
        }
    }
}