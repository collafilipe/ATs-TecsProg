import "reflect-metadata";
import { DataSource } from "typeorm";
import { Cliente } from "./model/cliente/cliente";
import { Acomodacao } from "./model/acomodacao/acomodacao";
import { Dependente } from "./model/cliente/dependente";
import { Documento } from "./model/cliente/documento";
import { Telefone } from "./model/cliente/telefone";
import { Quarto } from "./model/acomodacao/quartos";
import { Endereco } from "./model/cliente/endereco";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "atv5",
    synchronize: true,
    logging: false,
    entities: [
        Cliente,
        Acomodacao,
        Dependente,
        Documento,
        Telefone,
        Quarto,
        Endereco
    ],
    migrations: [],
    subscribers: [],
}
);