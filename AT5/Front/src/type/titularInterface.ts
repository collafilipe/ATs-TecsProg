import { Endereco } from "./enderecoInterface";
import { Telefone } from "./telefoneInterface";

export type Titular = {
    clienteID: number;
    id?: number;
    nome?: string;
    nomeSocial?: string;
    telefones?: Telefone[];
    endereco?: Endereco;
};