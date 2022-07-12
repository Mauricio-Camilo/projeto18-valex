import { Request, Response } from "express";
import * as cardService from "./../Services/cardService.js";

export async function createCard (req: Request, res: Response) {

    const { employeeId, type }: { employeeId: number , type: any } = req.body;

    await cardService.createCard(employeeId, type);
    
    res.status(201).send("Rota de criar cards ativada");
}

export async function activateCard (req: Request, res: Response) {

    const { cardId, inputSecurityCode, inputPassword }: { cardId: number , inputSecurityCode: number , inputPassword: string } = req.body;

    const { card } = res.locals;

    const { password,securityCode } = card;

    await cardService.activateCard(cardId, inputSecurityCode, 
        inputPassword, securityCode, password);

    res.status(200).send("Rota de ativação de card funcionando");
}

export async function getTransactions (req: Request, res: Response) {

    const { cardId }: { cardId: number } = req.body;

    const { card } = res.locals;

    console.log(card);

    res.send("Rote de mostras trnasações ativada");

}

export async function blockCard (req: Request, res: Response) {

    const { id, status } = res.locals;

    await cardService.checkBlockedCard(id, status);
    
    res.send("Rota de bloqueio de cartão ativa");
}

export async function releaseCard (req: Request, res: Response) {

    const { id, status } = res.locals;

    await cardService.checkReleasedCard(id, status);
    
    res.send("Rota de bloqueio de cartão ativa");
}

