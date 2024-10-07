import express, { Request, Response } from "express";
import { cadastrarQuarto, listarQuartos, editarQuarto, excluirQuarto } from "../controllers/acomodacao/quartos";

const router = express.Router();

router.get("/quartos", async (req: Request, res: Response) => {
    const result = await listarQuartos();
    res.status(result.status).send(result.message);
});

router.post("/quartos", async (req: Request, res: Response) => {
    const { tipo, quartoStatus } = req.body;
    const result = await cadastrarQuarto(tipo, quartoStatus);
    res.status(result.status).send(result.message);
});

router.delete("/quartos/:quartoID", async (req: Request, res: Response) => {
    const quartoID = parseInt(req.params.quartoID);
    const result = await excluirQuarto(quartoID);
    res.status(result.status).send(result.message);
});

router.put("/quartos/:quartoID", async (req: Request, res: Response) => {
    const quartoID = parseInt(req.params.quartoID);
    const { tipo, quartoStatus } = req.body;
    const result = await editarQuarto(quartoID, tipo, quartoStatus);
    res.status(result.status).send(result.message);
});

export default router;