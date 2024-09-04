import Processo from "../abstracoes/processo";
import CadastroAcomodacoes from "../processos/CRUD/Cadastro/cadastroAcomodacoes";
import Principal from "../processos/principal";

console.clear()
console.log(`Bem-vinde ao melhor sistema de gestão de clubes, hotéis e resorts do mundo, o Atlantis :)`);

let processo: Processo
let execucao: Boolean = true

processo = new CadastroAcomodacoes()
processo.processar()

while (execucao) {
    processo = new Principal()
    processo.processar()
    execucao = processo.Execucao
}