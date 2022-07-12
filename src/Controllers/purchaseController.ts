import { Request, Response } from "express";
import * as purchaseService from "../Services/purchaseService.js";

export async function postPurchase (req: Request, res: Response) {

    const { cardId, amount, businessId }: 
    { cardId: number , amount: number , businessId : number } = req.body;

    await purchaseService.savePurchase(cardId, amount, businessId);

    res.sendStatus(201);
}