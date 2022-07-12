import { Request, Response } from "express";
import * as rechargeService from "../Services/rechargeService.js";

export async function postRecharge (req: Request, res: Response) {

    const { cardId, amount }: { cardId: number , amount: number } = req.body;

    await rechargeService.rechargeCard(cardId, amount);

    res.sendStatus(201);
}
