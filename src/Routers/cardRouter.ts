import { Router } from "express";
import {createCard, activateCard, getTransactions, blockCard, releaseCard} from "../Controllers/cardController.js";
import { findCard, checkCardValidation, checkPassword } from "../Middlewares/cardMiddlewares.js";
import { validateAPIKey } from "../Middlewares/validationKeyMiddleware.js";

const cardRouter = Router();

cardRouter.post("/cards", validateAPIKey, createCard);
cardRouter.put("/cards", findCard, checkCardValidation, activateCard);
// cardRouter.get("/cards", findCard, getTransactions);
cardRouter.put("/cards/block", findCard, checkCardValidation, checkPassword, blockCard);
cardRouter.put("/cards/release", findCard, checkCardValidation, checkPassword, releaseCard);

export default cardRouter; 