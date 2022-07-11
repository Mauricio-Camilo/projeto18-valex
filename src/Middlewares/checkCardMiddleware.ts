import {Request, Response, NextFunction} from "express";
import * as cardRepository from "./../repositories/cardRepository.js";


export default async function findCard (req: Request, res: Response, next : NextFunction) {

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

