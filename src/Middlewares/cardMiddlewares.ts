import {Request, Response, NextFunction} from "express";
import Cryptr from 'cryptr';
import * as cardRepository from "../repositories/cardRepository.js";

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

export async function checkCardValidation (req: Request, res: Response, next : NextFunction) {

    const { card } = res.locals;

    const { expirationDate } = card;

    let today = (new Date(Date.now())).toLocaleDateString();
    let todayDate = Date.parse(today.substring(3,6) + today.substring(8));
    let limitDate = Date.parse(expirationDate);

    if (todayDate > limitDate) {
        return  res.status(422).send("Card expired");
    }

    next();
}

export async function checkPassword (req: Request, res: Response, next : NextFunction) {

    const { cardId, cardPassword }: { cardId: number, cardPassword : string } = req.body;

    const card = await cardRepository.findById(cardId);

    const crypt = new Cryptr("password");

    const decryptedPassword = crypt.decrypt(card.password);

    if (decryptedPassword !== cardPassword) {
        return res.status(422).send("Invalid password check");
    }

    res.locals.id = cardId;

    next();

}

export async function checkActivateCard (req: Request, res: Response, next : NextFunction) {
    const { card } = res.locals;

    const { isBlocked } = card;

    if (isBlocked) {
        return res.status(422).send("Card blocked")
    }

    next();
}

