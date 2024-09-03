import { TipoDocumento } from "../enumeracoes/TipoDocumento"

export default class Documento {
    static ultimoId: number = 0
    private id: number
    private numero: string
    private tipo: TipoDocumento
    private dataExpedicao: Date

    constructor(numero: string, tipo: TipoDocumento, dataExpedicao: Date) {
        Documento.ultimoId++
        this.id = Documento.ultimoId
        this.numero = numero
        this.tipo = tipo
        this.dataExpedicao = dataExpedicao
    }

    public get Numero(){
        return this.numero
    }
    public get Tipo(){
        return this.tipo
    }
    public get DataExpedicao(){
        return this.dataExpedicao
    }

    public setNumero(numero: string){
        this.numero = numero
    }

    public setDataExpedicao(dataExpedicao: Date){
        this.dataExpedicao = dataExpedicao
    }
    
}