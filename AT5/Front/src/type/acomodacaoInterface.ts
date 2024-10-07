import { Cliente2 } from './clienteInterface';
import Quarto from './quartoInterface';

export type Acomodacao = {
    acomodacaoID: number;
    quarto: Quarto;   // Ajuste para referenciar o objeto quarto corretamente
    cliente: Cliente2; // Ajuste para referenciar o objeto cliente corretamente
};
