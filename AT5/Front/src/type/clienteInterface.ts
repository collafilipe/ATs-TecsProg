import { Telefone } from "./telefoneInterface";
import { Endereco } from "./enderecoInterface";
import { Titular } from "./titularInterface";
import { Documento } from "./documentoInterface";
import { Dependente } from "./dependenteInterface";

export type Cliente2 = {
    clienteID: number
    nome?: string
    nomeSocial?: string
    dataNascimento?: string
    dataCadastro?: string
    telefones?: Telefone[]
    endereco?: Endereco
    documentos?: Documento[]
    dependentes?: Dependente[]
    titular?: Titular
}