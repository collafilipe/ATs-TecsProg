import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Cliente } from "./cliente";

@Entity()
export class Dependente {
    @PrimaryGeneratedColumn()
    dependenteID: number;

    @Column()
    nome: string;

    @Column()
    nomeSocial: string;

    @Column()
    dataNascimento: string;

    @Column({ nullable: true })
    cliente: number | null;

    constructor(nome: string, nomeSocial: string, dataNascimento: string, cliente: number) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.dataNascimento = dataNascimento;
        this.cliente = cliente;
    }
}