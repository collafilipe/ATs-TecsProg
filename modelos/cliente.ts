import Documento from "./documento";
import Endereco from "./endereco";
import Telefone from "./telefone";
import Dependente from "./dependente";

export default class Cliente {
    public nome: string;
    public nomeSocial: string;
    public dataNascimento: Date;
    public dataCadastro: Date;
    public telefones: Telefone[] = [];
    public endereco: Endereco;
    public documentos: Documento[] = [];
    public dependentes: Dependente[] = [];

    constructor(
        nome: string, 
        nomeSocial: string, 
        dataNascimento: Date, 
        dataCadastro: Date, 
        endereco: Endereco, 
        telefones: Telefone[]
    ) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.dataNascimento = dataNascimento;
        this.dataCadastro = dataCadastro;
        this.endereco = endereco;
        this.telefones = telefones;
    }

    adicionarDependente(dependente: Dependente): void {
        this.dependentes.push(dependente);
    }
}
