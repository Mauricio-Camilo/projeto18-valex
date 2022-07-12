import {Request, Response, NextFunction} from "express";
import Cryptr from 'cryptr';
import * as cardRepository from "../repositories/cardRepository.js";

export async function findCard (req: Request, res: Response, next : NextFunction) {

        const { cardId }: { cardId: number } = req.body;

        const cardData = await cardRepository.findById(cardId);

        if (!cardData) {
            throw {
                name: "notFound",
                message: "Card inexistent"
            }
        }
    
        res.locals.card = cardData;
         
        next();
}

export async function checkCardValidation (req: Request, res: Response, next : NextFunction) {

    const { card } = res.locals;

    const { expirationDate } = card;

    let today = (new Date(Date.now())).toLocaleDateString();
    let todayDate = Date.parse(today.substring(3,6) + today.substring(8));
    let limitDate = Date.parse(expirationDate);

    if (todayDate > limitDate) {
        throw {
            name: "validationError",
            message: "Card expired"
        }
    }

    next();
}

export async function checkPassword (req: Request, res: Response, next : NextFunction) {

    const { cardId, cardPassword }: { cardId: number, cardPassword : string } = req.body;

    const { card } = res.locals;

    const { password, isBlocked } = card;

    const crypt = new Cryptr("password");

    const decryptedPassword = crypt.decrypt(password);

    if (decryptedPassword !== cardPassword) {
        throw {
            name: "notAuthorized",
            message: "Invalid password"
        }
    }

        res.locals.status = isBlocked;

        res.locals.id = cardId;

    next();
}

// TIRAR DAQUI
export async function checkActivateCard (req: Request, res: Response, next : NextFunction) {

    const { card } = res.locals;

    const { isBlocked } = card;

    if (isBlocked) {
        throw {
            name: "notAuthorized",
            message: "Card blocked"
        }
    }

    next();
}

