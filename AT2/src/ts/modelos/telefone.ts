export default class Telefone {
    static ultimoId: number = 0
    private id: number
    private ddd: string
    private numero: string
    constructor(ddd: string, numero: string) {
        Telefone.ultimoId++
        this.id = Telefone.ultimoId
        this.ddd = ddd
        this.numero = numero
    }
    public get Ddd() { return this.ddd }
    public get Numero() { return this.numero }
}