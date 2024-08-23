import Documento from "./documento";
import Endereco from "./endereco";
import Telefone from "./telefone";
import Cliente from "./cliente";

export default class Dependente {
    public nome: string;
    public nomeSocial: string;
    public dataNascimento: Date;
    public dataCadastro: Date;
    public telefones: Telefone[] = [];
    public endereco: Endereco;
    public documentos: Documento[] = [];
    public titular: Cliente;

    constructor(
        nome: string, 
        nomeSocial: string, 
        dataNascimento: Date, 
        dataCadastro: Date, 
        telefones: Telefone[], 
        titular: Cliente
    ) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.dataNascimento = dataNascimento;
        this.dataCadastro = dataCadastro;
        this.telefones = telefones;
        this.endereco = titular.endereco.clonar() as Endereco;
        this.titular = titular;
    }
}
