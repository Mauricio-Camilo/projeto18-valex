import { Router } from "express";
import { postRecharge } from "../Controllers/rechargeController.js";
import { checkCardValidation, findCard, checkActiveCard } from "../Middlewares/cardMiddlewares.js";
import { validateAPIKey } from "../Middlewares/validationKeyMiddleware.js";

const rechargeRouter = Router();

rechargeRouter.post("/recharges", validateAPIKey, findCard, 
checkActiveCard, checkCardValidation, postRecharge);

export default rechargeRouter;
