export type Documento = {
    rg: string;
    cpf: string;
    passaporte: string;
    tipo?: string;
    numero?: string;
    dataExpedicao?: string;
    cliente?: number | null;
    dependente?: number | null;
};