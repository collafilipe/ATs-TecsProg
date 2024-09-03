import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Principal from "../processos/principal";

console.clear()
console.log(`Bem-vindo(a) ao melhor sistema de gestão de clubes, hotéis e resorts do mundo, o Atlantis :)`);

let processo: Processo
let execucao: Boolean = true

let armazem = Armazem.InstanciaUnica

while (execucao) {
    processo = new Principal()
    processo.processar()
    execucao = processo.Execucao
}