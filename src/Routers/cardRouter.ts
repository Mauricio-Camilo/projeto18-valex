import { Request, Response, Router } from "express";
import {createCard, activateCard} from "../Controllers/cardController.js";

const cardRouter = Router();

cardRouter.post("/cards", createCard);
cardRouter.put("/cards", activateCard);


export default cardRouter; 