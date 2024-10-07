import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./cliente";
import { Dependente } from "./dependente";

@Entity()
export class Endereco {
    @PrimaryGeneratedColumn()
    enderecoID: number;

    @Column()
    rua: string;

    @Column()
    bairro: string;

    @Column()
    cidade: string;

    @Column()
    estado: string;

    @Column()
    cep: string;

    @Column({ nullable: true })
    cliente: number | null;

    @Column({ nullable: true })
    dependente: number | null;

    constructor(rua: string, bairro: string, cidade: string, estado: string, cep: string, cliente: number | null = null, dependente: number | null = null) {
        this.rua = rua;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
        this.cliente = cliente || null;
        this.dependente = dependente;
    }
}