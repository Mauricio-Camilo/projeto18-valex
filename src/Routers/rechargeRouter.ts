import { Router } from "express";
import { postRecharge } from "../Controllers/rechargeController.js";
import { checkActivateCard, checkCardValidation, findCard } from "../Middlewares/cardMiddlewares.js";

const rechargeRouter = Router();

rechargeRouter.post("/recharges", findCard, checkActivateCard, checkCardValidation, postRecharge);

export default rechargeRouter;
