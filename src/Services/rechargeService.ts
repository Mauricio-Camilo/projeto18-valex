import * as rechargeRepository from "../repositories/rechargeRepository.js";

export async function rechargeCard (cardId : number, amount : number) {

    if (amount < 0) {
        throw {
            name: "validationError",
            message: "Invalid amount value"
        }
    }
    await rechargeRepository.insert({cardId, amount}); 
}
