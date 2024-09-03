import Cliente from "../../modelos/cliente";

export default function buscarClienteDocumento(clientes: Cliente[], documento: string): Cliente | undefined {
    let clienteEncontrado: Cliente | undefined
    clientes.forEach(cliente => {
        cliente.Documentos.forEach(doc => {
            if (doc.Numero == documento) {
                clienteEncontrado = cliente
            }
        })
    })
    return clienteEncontrado
}