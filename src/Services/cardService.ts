import { faker } from '@faker-js/faker';

import * as companyRepository from "./../repositories/companyRepository.js";
import * as employeeRepository from "./../repositories/employeeRepository.js";
import * as cardRepository from "./../repositories/cardRepository.js";


export async function findCompanyAPI (API_Key : string) {
    const checkAPI_Key = await companyRepository.findByApiKey(API_Key);
    return checkAPI_Key;
}

export async function findEmployeeId (id : number) {
    const checkId = await employeeRepository.findById(id);
    return checkId;
}

 export async function checkCardType (type, id: number) {
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

     const expirationDate = new Date(date);
     return expirationDate.toLocaleDateString()
 }

 export function createSecurityCode () {
     const securityCode = faker.finance.creditCardCVV();
     return securityCode;
 }

// export function getUserName () {
//     const fullName = 
// }