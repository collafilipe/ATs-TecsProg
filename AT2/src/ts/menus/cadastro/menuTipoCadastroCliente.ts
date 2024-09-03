import Menu from "../../interfaces/menu";

export default class MenuTipoCadastroCliente implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Qual o tipo do cadastro?`)
        console.log(`----------------------`)
        console.log(`| 1 - Titular`)
        console.log(`| 2 - Dependente`)
        console.log(`| 3 - Telefone`)
        console.log(`| 4 - Documento`)
        console.log(`----------------------`)
    }
}