import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { AppDataSource } from "../../data-source";

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    clienteID: number;

    @Column()
    nome: string;

    @Column()
    nomeSocial: string;

    @Column()
    dataNascimento: string;

    constructor(nome: string, nomeSocial: string, dataNascimento: string) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.dataNascimento = dataNascimento;
    }
}