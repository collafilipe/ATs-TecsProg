import express, { Request, Response } from "express";
import { cadastrarCliente, listarDependentes, excluirDependente, editarDependente } from "../controllers/clientes/dependente";

const router = express.Router();

router.get("/dependentes", async (req: Request, res: Response) => {
    const result = await listarDependentes();
    res.status(result.status).send(result.message);
});

router.post("/dependentes", async (req: Request, res: Response) => {
    const { nome, nomeSocial, dataNascimento, ddd, numero, rg, cpf, passaporte, clienteID } = req.body;
    const result = await cadastrarCliente(nome, nomeSocial, dataNascimento, ddd, numero, rg, cpf, passaporte, clienteID);
    res.status(result.status).send(result.message);
});

router.delete("/dependentes/:dependenteID", async (req: Request, res: Response) => {
    const dependenteID = parseInt(req.params.dependenteID);
    const result = await excluirDependente(dependenteID);
    res.status(result.status).send(result.message);
});

router.put("/dependentes/:dependenteID", async (req: Request, res: Response) => {
    const dependenteID = parseInt(req.params.dependenteID);
    const { nome, nomeSocial, dataNascimento, ddd, numero, rg, cpf, passaporte, clienteID } = req.body;
    const result = await editarDependente(dependenteID, nome, nomeSocial, dataNascimento, ddd, numero, rg, cpf, passaporte, clienteID);
    res.status(result.status).send(result.message);
});

export default router;