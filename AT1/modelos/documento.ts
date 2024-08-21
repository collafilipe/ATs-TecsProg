import { TipoDocumento } from "../enumeracoes/tipoDocumento";

export default class Documento {
    public numero: string;
    public tipo: TipoDocumento;
    public dataExpedicao: Date;

    constructor(numero: string, tipo: TipoDocumento, dataExpedicao: Date) {
        this.numero = numero;
        this.tipo = tipo;
        this.dataExpedicao = dataExpedicao;
    }
}
