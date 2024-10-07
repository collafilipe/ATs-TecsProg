import express, { Request, Response } from "express";
import { cadastrarCliente, listarClientes, excluirCliente, editarCliente, listarDependentes, listarDocumentos, listarEnderecos, listarTelefones } from "../controllers/clientes/cliente";

const router = express.Router();

router.get("/clientes", async (req: Request, res: Response) => {
    try {
        const { status, message: clientes } = await listarClientes();

        if (status !== 200) {
            throw new Error("Erro ao listar clientes");
        }

        // Executa todas as operações de listagem de uma só vez
        const dependentes = await listarDependentes();
        const enderecos = await listarEnderecos();
        const telefones = await listarTelefones();
        const documentos = await listarDocumentos();

        // Enviar uma resposta com todos os dados agregados
        res.status(200).send({
            clientes,
            dependentes,
            documentos,
            enderecos,
            telefones
        });
    } catch (error) {
        res.status(500).send({
            message: "Erro ao listar clientes",
            error
        });
    }
});



router.post("/clientes", async (req: Request, res: Response) => {
    const { nome, nomeSocial, dataNascimento, rua, bairro, cidade, estado, cep, ddd, numero, rg, cpf, passaporte } = req.body;
    const result = await cadastrarCliente(nome, nomeSocial, dataNascimento, rua, bairro, cidade, estado, cep, ddd, numero, rg, cpf, passaporte);
    res.status(result.status).send(result.message);
});

router.delete("/clientes/:clienteID", async (req: Request, res: Response) => {
    try {
        const clienteID = parseInt(req.params.clienteID);

        // Verifique se o clienteID é válido
        if (isNaN(clienteID)) {
            return res.status(400).send("ID do cliente inválido.");
        }

        // Chama a função excluirCliente e aguarda o resultado
        const result = await excluirCliente(clienteID);

        // Retorna o status e a mensagem apropriada
        return res.status(result.status).send(result.message);

    } catch (error) {
        // Em caso de erro inesperado
        return res.status(500).send("Ocorreu um erro ao tentar excluir o cliente.");
    }
});


router.put("/clientes/:clienteID", async (req: Request, res: Response) => {
    const clienteID = parseInt(req.params.clienteID);
    const { nome, nomeSocial, dataNascimento, rua, bairro, cidade, estado, cep, ddd, numero, rg, cpf, passaporte } = req.body;
    const result = await editarCliente(clienteID, nome, nomeSocial, dataNascimento, rua, bairro, cidade, estado, cep, ddd, numero, rg, cpf, passaporte);
    res.status(result.status).send(result.message);
});

export default router;