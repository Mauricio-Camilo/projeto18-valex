import { Request, Response } from "express";
import { connection } from "./../config/database.js";
import * as companyRepository from "./../repositories/companyRepository.js";
import * as cardService from "./../Services/cardService.js";


export default async function createCard(req: Request, res: Response) {

    const { employeeId, type }: { employeeId: number , type: any } = req.body;

    // Recebimento da chave, talvez mudar o jeito que recebe
    const { authorization } = req.headers;
    const API_Key = authorization?.replace('Bearer', '').trim();

    const checkAPI_Key = await cardService.findCompanyAPI(API_Key);

    // Validação da API_KEY
    if (!checkAPI_Key) {
        return res.sendStatus(422);
    }

    const checkEmployee = await cardService.findEmployeeId(employeeId);

    // Validação do funcionário
    if (!checkEmployee) {
        return res.sendStatus(422);
    }

    // Validação do tipo de cartão
    const checkCardType = await cardService.checkCardType(type, employeeId);

    if (checkCardType) {
        return res.sendStatus(422);
    }

    // Criação do número do cartão
    const cardNumber = cardService.createCardNumber();

    // Editar o nome para o cartão
    const cardName = cardService.editCardName(checkEmployee.fullName);

    // Gera a data de expiração do cartão
    const expirationDate = cardService.generateExpirationDate();

    // Gera o CVC do cartão
    const securityCode = cardService.createSecurityCode();
    console.log(securityCode);

    // FALTA CRIPTOGRAFAR O CÓDIGO DE SEGURANÇA;

    res.send("Rota de criar cards ativada");
}
