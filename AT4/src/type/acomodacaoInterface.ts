import { Cliente2 } from './clienteInterface';

export type Acomodacao = {
    id?: number;
    numero?: number;
    nome?: string;
    camaSolteiro?: number;
    camaCasal?: number;
    suite?: number;
    climatizacao?: boolean;
    garagem?: number;
    cliente?: Cliente2;
};