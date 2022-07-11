import { Request, Response, Router } from "express";
import {createCard, activateCard} from "../Controllers/cardController.js";
import findCard from "../Middlewares/checkCardMiddleware.js";

const cardRouter = Router();

cardRouter.post("/cards", createCard);
cardRouter.put("/cards", findCard, activateCard);


export default cardRouter; 