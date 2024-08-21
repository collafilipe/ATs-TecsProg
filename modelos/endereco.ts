import PromptSync from "prompt-sync";
import Prototipo from "../interfaces/prototipo";

export default class Endereco implements Prototipo {
    public rua: string;
    public bairro: string;
    public cidade: string;
    public estado: string;
    public pais: string;
    public codigoPostal: string;

    public clonar(): Prototipo {
        let endereco = new Endereco();
        endereco.rua = this.rua;
        endereco.bairro = this.bairro;
        endereco.cidade = this.cidade;
        endereco.estado = this.estado;
        endereco.pais = this.pais;
        endereco.codigoPostal = this.codigoPostal;
        return endereco;
    }

    static cadastrarEndereco(): Endereco {
        const prompt = PromptSync();

        let rua = prompt("Digite a rua: ");
        let bairro = prompt("Digite o bairro: ");
        let cidade = prompt("Digite a cidade: ");
        let estado = prompt("Digite o estado: ");
        let pais = prompt("Digite o país: ");
        let codigoPostal = prompt("Digite o código postal: ");

        let endereco = new Endereco();
        endereco.rua = rua;
        endereco.bairro = bairro;
        endereco.cidade = cidade;
        endereco.estado = estado;
        endereco.pais = pais;
        endereco.codigoPostal = codigoPostal;

        return endereco;
    }
}
