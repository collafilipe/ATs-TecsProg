import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Dependente } from "./dependente";
import { Cliente } from "./cliente";

@Entity()
export class Documento {
    @PrimaryGeneratedColumn()
    documentoID: number;

    @Column()
    rg: string;

    @Column()
    cpf: string;

    @Column()
    passaporte: string;

    @Column({ nullable: true })
    cliente: number | null;

    @Column({ nullable: true })
    dependente: number | null;

    constructor(rg: string, cpf: string, passaporte: string, cliente: number| null = null, dependente: number | null = null) {
        this.rg = rg;
        this.cpf = cpf;
        this.passaporte = passaporte;
        this.cliente = cliente;
        this.dependente = dependente;
    }
}