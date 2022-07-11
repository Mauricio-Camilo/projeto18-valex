import { Request, Response } from "express";

export async function postRecharge (req: Request, res: Response) {
    // README: PULAR ETAPA DA API_KEY

    const { cardId, amout }: { cardId: number , amout: number } = req.body;

    if (amout < 0) {
        return res.status(422).send("Invalid amount value");
    }

    

    res.send("Rota de recarga ativada");

}
