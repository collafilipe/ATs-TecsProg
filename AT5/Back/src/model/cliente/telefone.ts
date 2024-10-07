import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./cliente";
import { Dependente } from "./dependente";

@Entity()
export class Telefone {

    @PrimaryGeneratedColumn()
    telefoneID: number;

    @Column()
    ddd: string;

    @Column()
    numero: string;

    @Column({ nullable: true })
    cliente: number | null;

    @Column({ nullable: true })
    dependente: number | null;

    constructor(ddd: string, numero: string, cliente: number | null = null, dependente: number | null = null) {
        this.ddd = ddd;
        this.numero = numero;
        this.cliente = cliente;
        this.dependente = dependente;
    }
}