import * as businessRepository from "../repositories/businessRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";

export async function savePurchase (cardId: number , amount: number , businessId : number) {

    if (amount < 0) {
        throw {
            name: "validationError",
            message: "Invalid amount value"
        }
    }

    const business = await businessRepository.findById(businessId);

    if  (!business) {
        throw {
            name: "notFound",
            message: "Business not found"
        }
    }

    let card = await cardRepository.findById(cardId);

    if (business.type !== card.type) {
        throw {
            name: "notAuthorized",
            message: "Invalid type card"
        }
    }

    const cardRecharge = await rechargeRepository.findByCardId(cardId);

    if (cardRecharge[0].amount < amount) {
        throw {
            name: "notAuthorized",
            message: "Insuficient amount to finish purchase"
        }
    }

    await paymentRepository.insert({cardId, businessId, amount})
}
    

