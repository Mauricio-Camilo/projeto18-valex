import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';
import * as cardRepository from "./../repositories/cardRepository.js";
import * as employeeService from "./../Services/employeeService.js";

 export async function createCard (employeeId: number, type: any) {

    const employee = await creationValidations (employeeId, type);
   
    const cardNumber = createCardNumber();
    const cardName = editCardName(employee.fullName);
    const expirationDate = generateExpirationDate();
    const securityCode = createSecurityCode();

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

    await cardRepository.insert(cardData);
 } 

 export async function creationValidations (employeeId: number, type: any) {

    const checkEmployee = await employeeService.findEmployeeId(employeeId);

    if (!checkEmployee) {
        throw {
            name: "notFound",
            message: "Employee does not exist"
        }
    }

    const checkCard = await checkCardType(type, employeeId);

    if (checkCard) {
        throw {
            name: "notAuthorized",
            message: "Duplicated card cannot be created"
        }
    }

    return checkEmployee;
 }
 
 export async function checkCardType (type : any, id: number) {
    const checkType = await cardRepository.findByTypeAndEmployeeId(type, id);
    return checkType;
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
     console.log(securityCode);
     const crypt = new Cryptr("CVC_Key");
     const encryptedCode = crypt.encrypt(securityCode);

     return encryptedCode;
 }

 export async function findCard (id : number) {
    const checkCard = await cardRepository.findById(id);
    return checkCard;
}

 export async function activateCard (cardId : number, inputSecurityCode : number, 
    inputPassword : string, securityCode : string, password : string) {
     
   await checkSecurityCode(inputSecurityCode, securityCode);

    if (password) {
        throw {
            name: "alreadyExists",
            message: "Card already contains password, it cannot be activated"
        }   
     }
     await savePassword(cardId, inputPassword);
 }

export async function checkSecurityCode (inputSecurityCode : any, securityCode : any) {

    const crypt = new Cryptr("CVC_Key");
    const decryptedCode = crypt.decrypt(securityCode);

    if (inputSecurityCode !== decryptedCode) {
        throw {
            name: "notAuthorized",
            message: "Invalid security code"
        }
    }
}

export async function savePassword (id: number, password : any) {

    const regex = /^[0-9]{4}$/;
    const checkPassword = regex.test(password);
     if (!checkPassword) {
            throw {
                name: "validationError",
                message: "Invalid password format"
            } 
     }
     else {
        const crypt = new Cryptr("password");
        const encryptedPassword : any = crypt.encrypt(password);
        await cardRepository.update(id, {
            password: encryptedPassword,
            isBlocked: false
        });
     }
}

export async function checkBlockedCard (id : number, state : boolean) {
    console.log(state);
       if (state) {
        throw {
            name: "validationError",
            message: "This card is already blocked"
        } 
   }
   await changeCardState(id, true);
}

export async function checkReleasedCard (id : number, state : boolean) {
       if (!state) {
        throw {
            name: "validationError",
            message: "This card is already released"
        } 
   }
   await changeCardState(id, false);
}

export async function changeCardState (id : number, state : boolean) {
    await cardRepository.update(id, {
        isBlocked: state
    })
}
