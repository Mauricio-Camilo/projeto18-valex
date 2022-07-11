import {Request, Response, NextFunction} from "express";
import * as cardRepository from "../repositories/cardRepository.js";
import * as cardService from "../Services/cardService.js";


export async function findCard (req: Request, res: Response, next : NextFunction) {

    try {

        const { cardId }: { cardId: number } = req.body;

        const cardData = await cardRepository.findById(cardId);
    
        if (!cardData) {
            return res.status(422).send("Card inexistent")
        }
    
        res.locals.card = cardData;
         
        next();

    } catch (error) {
        console.error(error);
        res.status(500).send("Deu ruim")
    }

}

export async function checkValidCard (req: Request, res: Response, next : NextFunction) {

    const { card } = res.locals;

    const { expirationDate, password } = card;

    const expiredCard = await cardService.checkExpirationDate(expirationDate);

    if (expiredCard) {
        return res.status(422).send("Card expired");
    }

    next();
}

export async function checkPassword (req: Request, res: Response, next : NextFunction) {

    const { cardId, cardPassword }: { cardId: number, cardPassword : string } = req.body;

    const checkPassword = await cardService.checkPassword(cardId, cardPassword);

    if (!checkPassword) {
        return res.status(422).send("Invalid password check");
    }

    next();

}

