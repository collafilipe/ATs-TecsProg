import Menu from "../../interfaces/menu";

export default class MenuTipoExclusao implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Qual o tipo da exclusão?`)
        console.log(`----------------------`)
        console.log(`| 1 - Cliente`)
        console.log(`| 2 - Dependente`)
        console.log(`| 3 - Telefone`)
        console.log(`| 4 - Documento`)
        console.log(`----------------------`)
    }
}