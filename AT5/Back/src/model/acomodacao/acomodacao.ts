import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "../cliente/cliente";
import { Dependente } from "../cliente/dependente";
import { Quarto } from "./quartos";

@Entity()
export class Acomodacao {

    @PrimaryGeneratedColumn()
    acomodacaoID: number;

    @ManyToOne(() => Cliente)
    @JoinColumn({ name: 'clienteID' })
    cliente: Cliente;

    @ManyToOne(() => Quarto)
    @JoinColumn({ name: 'quartoID' })
    quarto: Quarto;

    constructor( cliente: Cliente, Quarto: Quarto) {
        this.cliente = cliente;
        this.quarto = Quarto;
    }
}