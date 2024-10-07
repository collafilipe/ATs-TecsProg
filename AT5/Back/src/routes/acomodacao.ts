import express, { Request, Response } from "express";
import { cadastrarAcomodacao, listarAcomodacoes, excluirAcomodacao, editarAcomodacao } from "../controllers/acomodacao/acomodacao";

const router = express.Router();

router.get("/acomodacoes", async (req: Request, res: Response) => {
    const result = await listarAcomodacoes();
    res.status(result.status).send(result.message);
});

router.post("/acomodacoes", async (req: Request, res: Response) => {
    const { clienteID, quartoID } = req.body;
    const result = await cadastrarAcomodacao(clienteID, quartoID);
    res.status(result.status).send(result.message);
});

router.delete("/acomodacoes/:acomodacaoID/:quartoID", async (req: Request, res: Response) => {
    const acomodacaoID = parseInt(req.params.acomodacaoID);
    const quartoID = parseInt(req.params.quartoID);
    const result = await excluirAcomodacao(acomodacaoID, quartoID);
    res.status(result.status).send(result.message);
});

router.put("/acomodacoes/:acomodacaoID", async (req: Request, res: Response) => {
    const acomodacaoID = parseInt(req.params.acomodacaoID);
    const { clienteID, quartoID } = req.body;
    const result = await editarAcomodacao(acomodacaoID, clienteID, quartoID);
    res.status(result.status).send(result.message);
});

export default router;