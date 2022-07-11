import { Request, Response } from "express";
import * as cardService from "./../Services/cardService.js";
import * as companyService from "./../Services/companyService.js"
import * as employeeService from "./../Services/employeeService.js"

export async function createCard(req: Request, res: Response) {

    const { employeeId, type }: { employeeId: number , type: any } = req.body;

    // Recebimento da chave, talvez mudar o jeito que recebe
    const { authorization } = req.headers;
    const API_Key = authorization?.replace('Bearer', '').trim();

    const checkAPI_Key = await companyService.findCompanyAPI(API_Key);

    // Validação da API_KEY
    if (!checkAPI_Key) {
        return res.status(422).send("Invalid API Key");
    }

    const checkEmployee = await employeeService.findEmployeeId(employeeId);

    // Validação do funcionário
    if (!checkEmployee) {
        return res.status(422).send("Employee does not exist");
    }

    // Validação do tipo de cartão
    const checkCardType = await cardService.checkCardType(type, employeeId);

    if (checkCardType) {
        return res.status(422).send("Duplicate card");
    }

    const card = await cardService.createCard(checkEmployee.fullName);
    console.log(card);
    const {cardNumber, cardName, expirationDate, securityCode} = card;

    const cardData = {
        employeeId,
        number: cardNumber,
        cardholderName: cardName,
        securityCode: securityCode, 
        expirationDate: expirationDate,
        password: null, 
        isVirtual: false,
        originalCardId: null, 
        isBlocked: true,
        type,
    }

    await cardService.saveCard(cardData);
   
    res.send("Rota de criar cards ativada");
}

export async function activateCard (req: Request, res: Response) {

    const { cardId, inputSecurityCode, inputPassword }: { cardId: number , inputSecurityCode: number , inputPassword: string } = req.body;

    const { card } = res.locals;

    const { expirationDate, password, securityCode } = card;

    const expiredCard = await cardService.checkExpirationDate(expirationDate);

    if (expiredCard) {
        return res.status(422).send("Card expired")
    }

    if (password) {
        return res.status(422).send("Card already contains password, it cannot be reactivated")
    }

    const checkSecurityCode = await cardService.checkSecurityCode (inputSecurityCode, securityCode);

    if (!checkSecurityCode) {
        return res.status(422).send("Invalid security code");
    }

    const savePassword = await cardService.savePassword(cardId, inputPassword);

    if (!savePassword) {
        return res.status(422).send("Invalid password format");
    }

    res.send("Rota de ativação de card funcionando");
}
