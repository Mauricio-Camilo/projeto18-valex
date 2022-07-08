import { Request, Response, Router } from "express";
import createCard from "../Controllers/cardController.js";

const cardRouter = Router();

cardRouter.post("/cards", createCard)

export default cardRouter; 