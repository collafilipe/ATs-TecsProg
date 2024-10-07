import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Quarto {

    @PrimaryGeneratedColumn()
    quartoID: number;

    @Column()
    tipo: string;

    @Column()
    quartoStatus: string;

    constructor( tipo: string, quartoStatus: string) {
        this.tipo = tipo;
        this.quartoStatus = quartoStatus;
    }
}