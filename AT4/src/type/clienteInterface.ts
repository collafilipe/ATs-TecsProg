import { Telefone } from "./telefoneInterface";
import { Endereco } from "./enderecoInterface";
import { Titular } from "./titularInterface";
import { Documento } from "./documentoInterface";
import { Dependente } from "./dependenteInterface";

export type Cliente2 = {
    id: number
    nome?: string
    nomeSocial?: string
    dataNascimento?: Date
    dataCadastro?: Date
    telefones?: Telefone[]
    endereco?: Endereco
    documentos?: Documento[]
    dependentes?: Dependente[]
    titular?: Titular
}