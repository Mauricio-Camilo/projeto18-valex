import { Router } from "express";
import { postRecharge } from "../Controllers/rechargeController.js";
import { checkActivateCard, checkCardValidation, findCard } from "../Middlewares/cardMiddlewares.js";
import { validateAPIKey } from "../Middlewares/validationKeyMiddleware.js";

const rechargeRouter = Router();

rechargeRouter.post("/recharges", validateAPIKey, findCard, 
checkActivateCard, checkCardValidation, postRecharge);

export default rechargeRouter;
