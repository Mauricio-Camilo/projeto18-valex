import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';
import * as cardRepository from "./../repositories/cardRepository.js";

 export async function checkCardType (type, id: number) {
     const checkType = await cardRepository.findByTypeAndEmployeeId(type, id);
     return checkType;
 }

 export async function createCard (name: string) {
    const cardNumber = createCardNumber();
    const cardName = editCardName(name);
    const expirationDate = generateExpirationDate();
    const securityCode = createSecurityCode();
    return {cardNumber, cardName, expirationDate, securityCode};
 } 

 export function createCardNumber () {
    const randomNumber : string = faker.finance.routingNumber(); 
    return randomNumber;
 }

 export function editCardName (name : string) {
    let splitName = name.split(" ");

    const removeShortNames = splitName.filter (name => name.length >= 3);

    const upperNames = removeShortNames.map (name => name.toUpperCase());

    const finalNames = []
    for (let i = 0; i < upperNames.length; i ++ ) {
        if (i !== 0 && i !== upperNames.length-1) 
            finalNames.push(upperNames[i].substring(0,1));
        else finalNames.push(upperNames[i]) ;
    }
    return finalNames.join(" ");
 }

 export function generateExpirationDate () {
     let date = Date.now();

     const oneDay = 1000 * 60 * 60 * 24; // One day in miliseconds
     const fiveYears = oneDay * 365 * 5;

     date += fiveYears + oneDay; // Add one day because lap year

     const expirationDate = new Date(date).toLocaleDateString();
     return (expirationDate.substring(3,6) + expirationDate.substring(8));
 }

 export function createSecurityCode () {
     const securityCode = faker.finance.creditCardCVV();

     const crypt = new Cryptr("CVC_Key");
     const encryptedCode = crypt.encrypt(securityCode);

     return encryptedCode;
 }

export async function saveCard (object : any) {
    await cardRepository.insert(object);
}

export async function findCard (id : number) {
    const checkCard = await cardRepository.findById(id);
    return checkCard;
}

export async function checkExpirationDate (expirationDate : any) {
    let today = (new Date(Date.now())).toLocaleDateString();
    let todayDate = Date.parse(today.substring(3,6) + today.substring(8));
    let limitDate = Date.parse(expirationDate);

    if (todayDate > limitDate) return true;
    else return false;
}

export async function checkSecurityCode (inputSecurityCode : any, securityCode : any) {

    const crypt = new Cryptr("CVC_Key");
    const decryptedCode = crypt.decrypt(securityCode);

    if (inputSecurityCode !== decryptedCode) return false
    else return true
}

export async function savePassword (id: number, password : any) {
    const regex = /^[0-9]{4}$/;
    const checkPassword = regex.test(password);
     if (!checkPassword) return false
     else {
        const crypt = new Cryptr("password");
        const encryptedPassword : any = crypt.encrypt(password);
        await cardRepository.update(id, {
            password: encryptedPassword,
            isBlocked: false
        });
        return true
     }
}

export async function checkPassword (id : number, password : string) {

    const card = await cardRepository.findById(id);

    const crypt = new Cryptr("password");

    const decryptedPassword = crypt.decrypt(card.password);

    if (decryptedPassword !== password) return false;
    else return true;
}

export async function changeCardState (id : number, state : boolean) {
    await cardRepository.update(id, {
        isBlocked: state
    })
}
