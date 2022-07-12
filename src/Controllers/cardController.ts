import { Request, Response } from "express";
import * as cardService from "./../Services/cardService.js";

export async function createCard (req: Request, res: Response) {

    const { employeeId, type }: { employeeId: number , type: any } = req.body;

    await cardService.createCard(employeeId, type);
    
    res.sendStatus(201);
}

export async function activateCard (req: Request, res: Response) {

    const { cardId, inputSecurityCode, inputPassword }: { cardId: number , inputSecurityCode: number , inputPassword: string } = req.body;

    const { card } = res.locals;

    const { password,securityCode } = card;

    await cardService.activateCard(cardId, inputSecurityCode, 
        inputPassword, securityCode, password);

        res.sendStatus(200);
    }

export async function blockCard (req: Request, res: Response) {

    const { id, status } = res.locals;

    await cardService.checkBlockedCard(id, status);
    
    res.sendStatus(200);
}

export async function releaseCard (req: Request, res: Response) {

    const { id, status } = res.locals;

    await cardService.checkReleasedCard(id, status);
    
    res.sendStatus(200);
}

export async function getTransactions (req: Request, res: Response) {

    const { cardId }: { cardId: number } = req.body;

    const transactions = await cardService.getCardTransactions(cardId);

    res.status(200).send(transactions);
}

