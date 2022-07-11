import { Router } from "express";
import {createCard, activateCard, getTransactions, blockCard} from "../Controllers/cardController.js";
import { findCard, checkValidCard, checkPassword } from "../Middlewares/cardMiddlewares.js";

const cardRouter = Router();

cardRouter.post("/cards", createCard);
cardRouter.put("/cards", findCard, checkValidCard, activateCard);
// cardRouter.get("/cards", findCard, getTransactions);
cardRouter.put("/cards/block", findCard, checkValidCard, checkPassword, blockCard);


export default cardRouter; 